const path = require('path');
const { body } = require('express-validator');

module.exports = [

	body('name').notEmpty().withMessage('Tienes que escribir un nombre'),
	body('description').notEmpty().withMessage('Tienes que escribir un apellido'),
	body('stock').notEmpty().withMessage('Tienes que escribir una contraseña'),
	body('discount').notEmpty().withMessage('Tienes que escribir tu dni'),
	body('category').notEmpty().withMessage('Tienes que elegir una fecha de cumpleaños'),
	body('price').notEmpty().withMessage('Tienes que escribir tu teléfono'),
	body('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif','jpeg'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]