// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const mainController = require("../controllers/mainController");


// ************ Views ************

/*** HOME PAGE ***/
router.get('/', mainController.index);

router.get('/contact', mainController.contact);


// ************ Export ************
module.exports = router;