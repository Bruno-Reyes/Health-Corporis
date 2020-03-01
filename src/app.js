const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MYSQLStore = require('express-mysql-session');
const passport = require('passport');
const { database } = require('./keys');
const Socket = require('socket.io');
const pool = require('./database');
const os = require('os');

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
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine' , '.hbs');

//Midlewares
app.use(session({
    secret : 'honeypot',
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
app.use('/user',require('./routes/cruduser'));
app.use('/admin',require('./routes/admin'));
app.use('/api',require('./routes/api_rest'));


//Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
let IP = ''
//Inicializar servidor
//let IP = os.networkInterfaces()['Ethernet 2'][1].address

const server = app.listen(app.get('port'), () => {
    console.log(`SERVER RUNNING IN ${IP}:${app.get('port')}`);
});

const io = Socket(server);

io.on('connection', (socket) => {
    console.log(`Alguien ha llegado :) ${socket.id}`);

    socket.on('grafica:client',async prueba => {  
        //grafica de la frecuencia cardiaca      
        const frecT = await pool.query('SELECT count(fre_rep) TOTAL FROM datosusuario');
        const frec1 = await pool.query('SELECT count(fre_rep) TOTAL FROM datosusuario WHERE fre_rep<60');
        const frec2 = await pool.query('SELECT count(fre_rep) TOTAL FROM datosusuario WHERE fre_rep>100');
        //grafica del imc
        const imc1 = await pool.query('select count(imc_usu) TOTAL from seguimiento where imc_usu<=15');
        const imc2 = await pool.query('select count(imc_usu) TOTAL from seguimiento where imc_usu<=15.90 and imc_usu>15');
        const imc3 = await pool.query('select count(imc_usu) TOTAL from seguimiento where imc_usu<=18.40 and imc_usu>15.90');
        const imc4 = await pool.query('select count(imc_usu) TOTAL from seguimiento where imc_usu>18.40 and imc_usu<=24.90');
        const imc5 = await pool.query('select count(imc_usu) TOTAL from seguimiento where imc_usu>24.90 and imc_usu<29.90');
        const imc6 = await pool.query('select count(imc_usu) TOTAL from seguimiento where imc_usu>=29.90 and imc_usu<34.90');
        const imc7 = await pool.query('select count(imc_usu) TOTAL from seguimiento where imc_usu>=34.90 and imc_usu<39.90');
        const imc8 = await pool.query('select count(imc_usu) TOTAL from seguimiento where imc_usu>=39.90');  
        //grafica de edad  
        const edad1=await pool.query('select count(eda_usu) TOTAL from datosusuario where eda_usu>=16 and eda_usu<20');  
        const edad2=await pool.query('select count(eda_usu) TOTAL from datosusuario where eda_usu>=20 and eda_usu<30');  
        const edad3=await pool.query('select count(eda_usu) TOTAL from datosusuario where eda_usu>=30 and eda_usu<40');  
        const edad4=await pool.query('select count(eda_usu) TOTAL from datosusuario where eda_usu>=40 and eda_usu<=50');    
        //grafica de peso
        const peso1=await pool.query('select count(pes_usu) TOTAL from seguimiento where pes_usu>=30 and pes_usu<50'); 
        const peso2=await pool.query('select count(pes_usu) TOTAL from seguimiento where pes_usu>=50 and pes_usu<70'); 
        const peso3=await pool.query('select count(pes_usu) TOTAL from seguimiento where pes_usu>=70 and pes_usu<90'); 
        const peso4=await pool.query('select count(pes_usu) TOTAL from seguimiento where pes_usu>=90 and pes_usu<110'); 
        const peso5=await pool.query('select count(pes_usu) TOTAL from seguimiento where pes_usu>=110 and pes_usu<130'); 
        const peso6=await pool.query('select count(pes_usu) TOTAL from seguimiento where pes_usu>=130 and pes_usu<150'); 
        const peso7=await pool.query('select count(pes_usu) TOTAL from seguimiento where pes_usu>=150 and pes_usu<170'); 
        const peso8=await pool.query('select count(pes_usu) TOTAL from seguimiento where pes_usu>=170 and pes_usu<=200'); 
        //grafica de estatura
        const estatura1=await pool.query('select count(est_usu) TOTAL from seguimiento where est_usu>=1 and est_usu<1.20'); 
        const estatura2=await pool.query('select count(est_usu) TOTAL from seguimiento where est_usu>=1.20 and est_usu<1.40'); 
        const estatura3=await pool.query('select count(est_usu) TOTAL from seguimiento where est_usu>=1.40 and est_usu<1.60'); 
        const estatura4=await pool.query('select count(est_usu) TOTAL from seguimiento where est_usu>=1.60 and est_usu<1.80'); 
        const estatura5=await pool.query('select count(est_usu) TOTAL from seguimiento where est_usu>=1.80 and est_usu<2'); 
        const estatura6=await pool.query('select count(est_usu) TOTAL from seguimiento where est_usu>=2 and est_usu<2.20'); 
        const estatura7=await pool.query('select count(est_usu) TOTAL from seguimiento where est_usu>=2.20 and est_usu<=2.50');   
        //Intensidad de ejercicio
        const intensidad1=await pool.query('select count(ren_dep) TOTAL from datosusuario where ren_dep>=50 and ren_dep<70'); 
        const intensidad2=await pool.query('select count(ren_dep) TOTAL from datosusuario where ren_dep>=70 and ren_dep<80'); 
        const intensidad3=await pool.query('select count(ren_dep) TOTAL from datosusuario where ren_dep>=80 and ren_dep<=100');  
        //genero
        const genero1=await pool.query('select count(id_gen) TOTAL from datosusuario where id_gen=1')  
        const genero2=await pool.query('select count(id_gen) TOTAL from datosusuario where id_gen=2')  
        //datos de la grafica frecuencia cardiaca
        let fT=parseInt(frecT[0].TOTAL);
        let f1=parseInt(frec1[0].TOTAL);
        let f2=parseInt(frec2[0].TOTAL);
        let f3 = fT-(f1+f2);    
        //datos de la grafica del imc
        let imcc1=parseInt(imc1[0].TOTAL);
        let imcc2=parseInt(imc2[0].TOTAL);
        let imcc3=parseInt(imc3[0].TOTAL);
        let imcc4=parseInt(imc4[0].TOTAL);
        let imcc5=parseInt(imc5[0].TOTAL);
        let imcc6=parseInt(imc6[0].TOTAL);
        let imcc7=parseInt(imc7[0].TOTAL);//
        let imcc8=parseInt(imc8[0].TOTAL);
        //datos de la grafica ed
        let ed1=parseInt(edad1[0].TOTAL);
        let ed2=parseInt(edad2[0].TOTAL);
        let ed3=parseInt(edad3[0].TOTAL);
        let ed4=parseInt(edad4[0].TOTAL);
        //grafica del peso
        let pes1=parseInt(peso1[0].TOTAL);
        let pes2=parseInt(peso2[0].TOTAL);
        let pes3=parseInt(peso3[0].TOTAL);
        let pes4=parseInt(peso4[0].TOTAL);
        let pes5=parseInt(peso5[0].TOTAL);
        let pes6=parseInt(peso6[0].TOTAL);
        let pes7=parseInt(peso7[0].TOTAL);
        let pes8=parseInt(peso8[0].TOTAL);
        //datos estatura
        let est1=parseInt(estatura1[0].TOTAL);
        let est2=parseInt(estatura2[0].TOTAL);
        let est3=parseInt(estatura3[0].TOTAL);
        let est4=parseInt(estatura4[0].TOTAL);
        let est5=parseInt(estatura5[0].TOTAL);
        let est6=parseInt(estatura6[0].TOTAL);
        let est7=parseInt(estatura7[0].TOTAL);
        //datos de intensidad
        let inten1=parseInt(intensidad1[0].TOTAL);
        let inten2=parseInt(intensidad2[0].TOTAL);
        let inten3=parseInt(intensidad3[0].TOTAL);
        //fatos de genero
        let gen1=parseInt(genero1[0].TOTAL);
        let gen2=parseInt(genero2[0].TOTAL);
        socket.emit('grafica:datos', {dat1:fT,dat2:f1,dat3:f2,dat4:f3,dat5:imcc1,dat6:imcc2,dat7:imcc3,
            dat8:imcc4,dat9:imcc5,dat10:imcc6,dat11:imcc7,dat12:imcc8,dat13:ed1,dat14:ed2,dat15:ed3,dat16:ed4,
            datE1:est1,datE2:est2,datE3:est3,datE4:est4,datE5:est5,datE6:est6,datE7:est7,
            datP1:pes1,datP2:pes2,datP3:pes3,datP4:pes4,datP5:pes5,datP6:pes6,datP7:pes7,datP8:pes8,
            datIn1:inten1,datIn2:inten2,datIn3:inten3,
            datGE1:gen1,datGE2:gen2
        });
    });        
});