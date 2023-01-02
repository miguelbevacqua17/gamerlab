//MIDDLEWARE APLICACION PARA NO MOSTRAR LAS OPCIONES SI YA INICIASTE SESION 

const db = require("../database/models")

 async function userLoggedMiddleware(req, res, next) { 
	let sessionUserId = await req.session.userLogged
	let sessionUser = null
	res.locals.isLogged = false;

	let emailInCookie = req.cookies.user; 
	let cookieUser = null;

	if(sessionUserId){
		//si hay un usuario en session (solo tengo el id) traigo de la db todos los otros datos y los almaceno en sessionUser
		sessionUser = await db.Cliente.findByPk(sessionUserId)
	} else if (emailInCookie){
		//si hay un usuario en session (solo tengo el id) traigo de la db todos los otros datos y los almaceno en cookieUser
		cookieUser = await db.Cliente.findByPk(emailInCookie)
	} 

	if(sessionUser){
		// si encontro el usuario, hago que las variables de locals contengan todos los datos del usuario para poder renderizarlos en el header
		res.locals.isLogged = sessionUser.dataValues;
		res.locals.userLogged = sessionUser.dataValues;  
	} else if(cookieUser){
		// si encontro el usuario, hago que las variables de locals contengan todos los datos del usuario para poder renderizarlos en el header
		res.locals.isLogged = cookieUser.dataValues;
		res.locals.userLogged = cookieUser.dataValues;  
	}

	next();
}

module.exports = userLoggedMiddleware;