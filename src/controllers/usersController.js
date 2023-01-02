const fs = require('fs');
const path = require('path');

// ************ Require DATABASE ************
const db = require("../database/models")

// ************ otros Require's ************
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const storage = require("../middlewares/multerMiddleware")
const userLogged = require('../middlewares/userLoggedMiddleware')


// ************ Controller ************
const usersController = {

/*** USER LOGIN ***/
    login: (req, res) => {
        db.Cliente.findAll()
       .then(function(clientes) {
            res.render ("login", {clientes})
        })
    },


/*** LOGIN FUNCIONA ***/
    checkLogin: (req, res) => {
        db.Cliente.findOne({
            where: {email: req.body.email}
            })
            .then( user => {
                let contrasena = false
                let mail = false
                if (user){
                    mail = true
                    let isOkThePassword = bcryptjs.compareSync(req.body.contrasena, user.contrasena);
                    if(isOkThePassword){
                        contrasena = true
                        req.session.userLogged = user.id;
                        if (req.body.remember_user != undefined){
                            req.session.userLogged = user.id;
                            res.cookie('user', user.id, { maxAge: 1000 * 3600})
                            res.redirect('/users/profile')
                        } else {
                            res.redirect('/users/profile')
                        }
                    } else {
                        res.render('login', {
                            errors: {
                                email: {
                                    msg: 'Las credenciales son incorrectas'}}
                        })    
                    }   
                } else {
                    res.render('login', {
                        errors: {
                            email: {
                                msg: 'Las credenciales son incorrectas'}}
                    })    
                }
            })
    },


/*** REGISTRO ***/
    registro: (req, res) => {
        db.Cliente.findAll()
        .then(function(clientes) {
            res.render ("registro", {clientes})
        })
    },

    checkRegistro: (req, res) => {
        const resultValidation = validationResult(req);
        
        if (resultValidation.errors.length > 0) {
            return res.render('registro', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        db.Cliente.count({
                        where: {email: req.body.email}
                        })
            .then(count => {
                if (count != 0) {

                res.render('registro', {
                    errors: {
                        email: {
                        msg: 'Este email ya esta registrado'
                    }},
                    oldData: req.body
                })

            } else {
                
             db.Cliente.create({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    contrasena: bcryptjs.hashSync(req.body.contrasena, 10),
                    rol: 0,
                    dni: req.body.dni,
                    fecha_nacimiento: req.body.fecha_nacimiento,
                    telefono: req.body.telefono,
                    imagen: req.file.filename,
                    envio_fk: null,
                    created_at: Date.now(),
                    updated_at: 0,
                })
                res.redirect('./login');
            }
        })
    },


/*** PERFIL ***/
    perfil: async (req, res) => {
        let user = await req.session.userLogged
        db.Cliente.findByPk(user)
        .then((user) => {
            res.render('perfil', {user: user})
        })
        .catch((e) => {
            res.send(e)
        })
    },  

    editarPerfil: (req, res) => {
        db.Cliente.findByPk(req.params.id)
        .then((user)=>{
        return res.render('edicionPerfil', {user})
        })
    },


/*** UPDATE ***/
    update: async (req, res)=>{ 
        let cliente = await db.Cliente.findOne({
            where: {id: req.params.id}
        })
        .then( db.Cliente.update({
                nombre: req.body.name,
                apellido: req.body.apellido,
                imagen: (req.file? req.file.filename: db.Cliente.image),
                email: req.body.email,
                fecha_nacimiento:req.body.fecha_nacimiento,
                telefono: req.body.telefono, 
                dni: req.body.dni,
                updated_at: Date.now(),
                   
            }, {where:{
                id:req.params.id
                }})
        ).then(function(){res.redirect('/users/profile/' + req.params.id)})
              
    },

/*** EDITAR PASSWORD ***/
    editarPassword: async (req, res) => {
        let user = await db.Cliente.findByPk(req.params.id)

            return res.render ("editarPassword", {user})
    },


    checkEditarPassword: async (req, res) => {
        
        let user = await db.Cliente.findOne({
            where: {id:req.params.id}
            })

        .then( cliente => {
            let contrasenaInput = req.body.contrasena
            let contrasenaBdd = cliente.contrasena

            if (bcryptjs.compareSync(contrasenaInput, contrasenaBdd) == true){

                db.Cliente.update({
                contrasena: bcryptjs.hashSync(req.body.nuevaContrasena, 10)       
            }, {where:{
                id:req.params.id
                }
            })
            .then(function(){res.redirect('/users/profile/' + req.params.id)})}
        })

        .then(function(){res.redirect('/users/profile/' + req.params.id)})

        // res.render('editarPassword');
    },

/*** CERRAR SESION ***/
    logout: (req, res) => {
        res.clearCookie('user');
        req.session.destroy();
        res.redirect('/')
    },

    /***API***/

    count: (req,res) => {
        db.Cliente.findAll()
        .then(clientes => {

            for (let i = 0; i < clientes.length ; i++){
                //console.log(clientes.length, i)
                clientes[i].contrasena = null
            }

            return res.status(200).json({
                total: {
                    totalUsers: clientes.length
                    },
                data: clientes,
                status: 200
            })
        })
    },
   
    users: (req, res) => {
        db.Cliente.findByPk(req.params.id)
        .then(user => {

            user.contrasena = null
            
            return res.status(200).json({
                data: user,
                status:200
            })
    
        })
    }


}


// ************ Export ************
module.exports = usersController;