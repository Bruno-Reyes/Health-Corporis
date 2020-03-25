const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MYSQLStore = require('express-mysql-session');
const passport = require('passport');
const { database } = require('../keys');
const pool = require('../database');

//Inicializar todo

const app = express();
require('./lib/passport');

//Configuraciones del servidor

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine' , '.hbs');

//Midlewares
app.use(session({
    secret : 'Health-Corporis',
    resave: false,
    saveUninitialized: false,
    store: new MYSQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables globales
app.use((req, res, next) => {
    app.locals.Exito = req.flash('Success');
    app.locals.Error = req.flash('Error');
    app.locals.user = req.user;
    next();
});

//Contemplando error 404

//Rutas

app.use(require('./routes/index'));
app.use(require('./routes/autenticacion'));
app.use('/user',require('./routes/user'));
app.use('/admin',require('./routes/admin'));
/*
app.use('/api',require('./routes/api_rest'));
*/


//Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Inicializar servidor

app.listen(app.get('port'), () => {
    console.log(`SERVER RUNNING IN PORT ${app.get('port')}`);
});