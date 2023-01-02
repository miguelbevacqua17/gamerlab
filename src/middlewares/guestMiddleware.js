//MIDDLEWARE PARA LAS RUTAS Y QUE NO TE DEJE VOLVER A REGISTARTE SI YA INICIASTE SESSION

function guestMiddleware (req, res, next) {
	if(req.session.userLogged) {
		return res.redirect('/users/profile');
	}
	next();
}

module.exports = guestMiddleware;

