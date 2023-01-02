// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require ("path");

// ************ Controller Require ************
const productsController = require("../controllers/productsController");


// ************ Middlewares ************
const uploadFile = require ("../middlewares/imageMiddleware");
//const validations = require('../middlewares/validateProductMiddleware');

// ************ Views ************

/*** HOME PAGE ***/
router.get('/', productsController.index); 

/*** TODOS LOS PRODUCTOS Y DETALLE DE PRODUCTO ***/
router.get("/producto", productsController.listadoProductos); 
router.get("/detail/:id", productsController.detalleProductos);

/*** EDITAR UN PRODUCTO***/
router.get("/edit/:id", productsController.edicionProducto);
router.put("/edit/:id", uploadFile.single('image'), productsController.checkEdicionProducto);

/*** CREAR UN NUEVO PRODUCTO ***/
router.get("/create", productsController.creacionProducto);
router.post("/create", uploadFile.single('image'), productsController.checkCreacionProducto); 
 
/*** ELIMINAR UN PRODUCTO ***/
router.delete("/delete/:id", productsController.delete)
router.get("/search", productsController.search)
router.get("/categoria/:id", productsController.categorias);

/*** VER EL CARRITO ***/

router.get('/cart', productsController.carrito);
router.post("/checkout", productsController.pagar)

/***API***/
router.get("/api", productsController.list)
router.get("/api/categories", productsController.categories)
router.get("/api/:id", productsController.productoTotal)

// ************ Export ************
module.exports = router;