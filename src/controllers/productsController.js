// ************ Require's ************
const fs = require('fs');
const path = require('path');
const mercadopago = require('mercadopago')

// ************ Require DATABASE ************
const db = require ("../database/models")
const uploadFile = require ("../middlewares/imageMiddleware");

mercadopago.configure({
    access_token: 'APP_USR-327784668252270-111502-2ac20dc1d5088b2e30bb07d2bfef4cbf-672708481'
})

// ************ otros Require's ************
const { inflateRaw } = require('zlib');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { response } = require('express');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require('express-validator');
const { preferences } = require('mercadopago');


// ************ Controller ************
const productsController = {


/*** LISTADO DE TODOS LOS PRODUCTOS ***/
    listadoProductos: (req, res) => {
        let pedidoProductos = db.Producto.findAll()
        let pedidoClientes = db.Cliente.findAll()

        Promise.all([pedidoProductos, pedidoClientes])
        .then(function([productos, clientes]){
            return res.render("producto", {productos, clientes})
        })
    },

    index:(req,res) =>{
        db.Producto.findAll({include: [{association: 'productos'}, {association: 'categorias'}]}) 
        .then((productos) => {
        let listadoProductos = [];
        for (producto of productos){
            let listaCategorias = [];
            for (producto of productos.productos){
                listadoProductos.push(producto.nombre + producto.imagen);
            }
            let objaux = {
                nombre: producto.nombre,
                imagen: producto.imagen
            }
            listadoProductos.push(objaux);
        }
        
        res.render("index", {productos: listadoProductos})
    })},

/*** DETALLE DE PRODUCTO ***/
    detalleProductos: (req, res) => {        
        db.Producto.findByPk(req.params.id, {
            include: [{association: "categorias"}]
        })
        .then(function(productos, categorias){
            res.render("detail", {productos, categorias})
        })
    },


/*** CREATE Y STORE ***/
    creacionProducto:(req, res) => {
        db.categorias.findAll()
        .then(function(categorias){
            return res.render("creacionProducto", {categorias})
        } )
    },

    checkCreacionProducto:(req, res) => {
        db.Producto.create({
            categoria_fk: req.body.category,
            nombre: req.body.name,
            imagen: req.file.filename,
            descripcion: req.body.description,
            precio_lista: req.body.price,
            descuento: req.body.discount,
            stock: req.body.stock,
            deleteable: 1,
            created_at: Date.now(),
            updated_at: 0,
            deleted_at: 0,
        })
        res.redirect('/');    
    },


/*** EDIT Y UPDATE DE UN PRODUCTO***/
    edicionProducto:async (req, res) => {
        let productos = await db.Producto.findByPk(req.params.id)
        let categorias = await db.categorias.findAll();

            return res.render ("edicionProducto", {productos, categorias})
    },
 
    checkEdicionProducto:async(req, res) => {

        let producto = await db.Producto.findOne({
            where: {id:req.params.id}
            })
            .then( db.Producto.update({
                        nombre: req.body.name,
                        descripcion:req.body.description,
                        precio_lista: req.body.price,
                        descuento: req.body.discount,
                        categoria_fk: req.body.category,
                        updated_at: Date.now(),
                        deleteable: 1,
                        stock: req.body.stock,
                        imagen: (req.file? req.file.filename : db.Producto.imagen)

        }, {where:{
            id:req.params.id
            }})
        
        ).then(function(){res.redirect('/products/detail/' + req.params.id)})
    },


/*** BORRAR UN PRODUCTO ***/
    delete:(req, res) => {
        db.Producto.update({
            deleteable: 0,
            deleted_at: Date.now(),
        }, {where:{
            id:req.params.id
            }}
        )
        res.redirect("/");
    },

    search: function(req, res) {

        db.Producto.findAll({
            where: { nombre: {[Op.like]: '%' + req.query.keyword + '%'}}
        })
        
        .then(productos => {
            if (productos) {
            return res.render("productoBuscado", {productos});
        }
        return res.status(200).json('No existen productos')
        })
    },

    categorias: async (req, res) => {
        let productos = await db.Producto.findAll({
                        where: {categoria_fk: req.params.id}
                        })
        let categorias = await db.categorias.findOne({
                        where: {id: req.params.id}
                        });

            return res.render ("categoria", {productos, categorias})
    },

    /*** CARRITO ***/
    carrito: (req, res) => {
        db.Producto.findAll()
       .then(function(productos) {
            res.render ("carrito", {productos})
        })
    },
    pagar: (req, res) => {
        let productos = [];
        const compra = req.body.title;
        const precio = req.body.price;
        const cantidad = req.body.quantity;
        if(compra[0].length > 1){
        for (let i = 0; i < compra.length; i++) {
        productos.push({
            title: compra[i],
            unit_price: parseInt(precio[i]),
            quantity: parseInt(cantidad[i])
        })
        }
    }else {productos.push({
        title: compra,
        unit_price: parseInt(precio),
        quantity: parseInt(cantidad)
    })}
       let preference = {
        items: productos,
        back_urls: {
            success: "http://localhost:3077/",
            failure: "http://localhost:3077/products/cart",
            pending: "http://localhost:3077/products/cart"
        }
    }
    mercadopago.preferences.create(preference)
    .then(function (response) {
      res.redirect(response.body.init_point);
    }).catch(function (error) {
      console.log(error);
    });
},
    /** APIS **/

    list: async (req, res) => {  

        let productos = await db.Producto.findAll()
        
        let categorias = await db.categorias.findAll() 

        let prodCant = []
            // este for arma un array que tiene de propiedades los nombres de las categorias que vienen de la db
                for(categoria of categorias){
                    prodCant.push({
                        id: categoria.id,
                        nombre: categoria.nombre,
                        cantidad: 0
                    })
                }

        let prods = []
                for(producto of productos){
                    prods.push({
                        idCat: producto.categoria_fk,
                        id: producto.id,
                        nombre: producto.nombre,
                    })
                }

        for (let i = 0; i < prodCant.length; i++) {
            for (let y = 0; y < prods.length; y++) {
                if (prodCant[i].id == prods[y].idCat){
                    prodCant[i].cantidad += 1
                }
            }
        }

            Promise.all([productos, categorias])
                .then( (values) => {
                    return res.status(200).json({
                        countProd: productos.length,
                        products: productos,
                        countCat: categorias.length,
                        categories: categorias, 
                        countByCategory: prodCant,
                    })
                })
    },
                    

    categories: async (req, res) => {

        let productos = await db.Producto.findAll()
        
        let categorias = await db.categorias.findAll() 

        let prodCant = []
            // este for arma un array que tiene de propiedades los nombres de las categorias que vienen de la db
                for(categoria of categorias){
                    prodCant.push({
                        id: categoria.id,
                        nombre: categoria.nombre,
                        cantidad: 0
                    })
                }

        let prods = []
                for(producto of productos){
                    prods.push({
                        idCat: producto.categoria_fk,
                        id: producto.id,
                        nombre: producto.nombre,
                    })
                }

        for (let i = 0; i < prodCant.length; i++) {
            for (let y = 0; y < prods.length; y++) {
                if (prodCant[i].id == prods[y].idCat){
                    prodCant[i].cantidad += 1
                }
            }
        }

            Promise.all([productos, categorias])
                .then( (values) => {
                    return res.status(200).json({
                        count: categorias.length,
                        categories: categorias,
                        countByCategory: prodCant,
                    })
                })
    },

    productoTotal: (req, res) => {
        db.Producto.findByPk(req.params.id, {
            include: [{association: "categorias"}]
        })
        .then(producto => {
            return res.status(200).json({
                data: producto,
                status:200
            })
        })
    }
};


// ************ Export ************
module.exports = productsController;