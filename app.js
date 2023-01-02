const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const cookies = require('cookie-parser');
const session = require('express-session');
const errors = require('http-errors');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');
const app = express();

const router = require("./src/routes/mainRouter");
const usersRouter = require("./src/routes/usersRouter");
const productsRouter = require ("./src/routes/productsRouter")
//CORS
const cors = require ("cors")
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(session({ secret: "es secreto", resave: false, saveUninitialized: false}))
app.use(cookies());
app.use(userLoggedMiddleware);

app.use(express.static(path.resolve(__dirname, "./public")));

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');

//VISTAS
app.use("/", router);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.get("*", function(req, res){
    res.render("error");
    res.statusCode = 404;
});

//SERVER
app.listen(process.env.PORT || 3077, () =>{
    console.log("servidor corriendo")
});

