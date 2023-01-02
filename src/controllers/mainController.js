// ************ Require's ************
const fs = require('fs');
const path = require('path');

const { Op } = require("sequelize");
const { response } = require('express');


// ************ Require DATABASE ************
const db = require ("../database/models")


// ************ Controller ************
const mainController = 
{
    index: (req, res) => {
        db.Producto.findAll()
        .then(function(productos) {
            res.render ("index", {productos})
        })
    },
    contact: (req,res) => {
        res.render("contact");
    }
}


// ************ Export ************
module.exports = mainController