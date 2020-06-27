const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MYSQLStore = require("express-mysql-session");
const passport = require("passport");
const { database } = require("../keys");
const pool = require("../database");
const Socket = require("socket.io");
const { Chat, ChatPrivado, Consejos } = require("./models")
const validator = require('validator')

//Inicializar todo
const app = express();
require("./lib/passport");

//Configuraciones del servidor
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
    ".hbs",
    handlebars({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs",
    })
);

app.set("view engine", ".hbs");

//Midlewares
app.use(
    session({
        secret: "Health-Corporis",
        resave: false,
        saveUninitialized: false,
        store: new MYSQLStore(database),
    })
);
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables globales
app.use((req, res, next) => {
    app.locals.Exito = req.flash("Success");
    app.locals.Error = req.flash("Error");
    app.locals.user = req.user;
    next();
});

//Contemplando error 404

//Rutas
app.use(require("./routes/index"));
app.use(require("./routes/autenticacion"));
app.use("/user", require("./routes/user"));
app.use("/admin", require("./routes/admin"));
app.use("/api", require("./routes/api"));

//Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

//Inicializar servidor
const server = app.listen(app.get("port"), () => {
    console.log(`SERVER RUNNING IN PORT ${app.get("port")}`);
});

const io = Socket(server);
let users = {};

io.on("connection", async(socket) => {
    console.log(`Alguien ha llegado :) ${socket.id}`);

    let allMessages = await ChatPrivado.find().sort({ created_at: 1 });
    socket.emit("old-messages", allMessages);

    socket.on("new-user", (data, cb) => {
        console.log(data);
        if (data in users) {
            cb(false);
        } else {
            cb(true);
            socket.nickname = data;
            users[socket.nickname] = socket;
            updateNicknames();
        }
    });
    socket.on("send-message-from-admin", async(data, cb) => {
        var msg = data.msg.trim();
        var name = data.user;
        let comillas = 0;
        let pacman = 0;
        let corchete = 0;
        let llave = 0;
        let guionBajo = 0;
        let guionMedio = 0;
        for (let i = 0; i < msg.length; i++) {
            if (msg.charAt(i) == '"') {
                comillas++;
            }
            if (msg.charAt(i) == '<' || msg.charAt(i) == '>') {
                pacman++;
            }
            if (msg.charAt(i) == '[' || msg.charAt(i) == ']') {
                corchete++;
            }
            if (msg.charAt(i) == '{' || msg.charAt(i) == '}') {
                llave++;
            }
            if (msg.charAt(i) == '-') {
                guionMedio++;
            }
            if (msg.charAt(i) == '_') {
                guionBajo++;
            }
        }
        if (name in users) {
            if (msg != null) {
                if (comillas === 0 && pacman == 0 && corchete === 0 && llave === 0 && guionMedio === 0 && guionBajo === 0) {
                    if (validator.isLength(msg, { min: 5, max: 100 })) {
                        users[name].emit("whisper", {
                            msg,
                            nick: socket.nickname,
                        });
                        var newMessage = new ChatPrivado({
                            nick: socket.nickname,
                            msg,
                            privado: name,
                        });
                        await newMessage.save();
                        io.sockets.emit("new-message-admin", {
                            msg,
                            nick: socket.nickname,
                            privado: name,
                        });
                    } else {
                        cb("Error! El largo del mensaje debe de ser de 5-100");
                    }
                } else {
                    cb('Error! No se permiten los simbolos " <> [] {} - _ ');
                }
            } else {
                cb("Error! El mensaje esta vacio");
            }
        } else {
            cb("Error! Ingresa un usuario valido");
        }
    });
    socket.on("send-message-from-user", async(data, cb) => {
        var msg = data.trim();
        let comillas = 0;
        let pacman = 0;
        let corchete = 0;
        let llave = 0;
        let guionBajo = 0;
        let guionMedio = 0;
        for (let i = 0; i < msg.length; i++) {
            if (msg.charAt(i) == '"') {
                comillas++;
            }
            if (msg.charAt(i) == '<' || msg.charAt(i) == '>') {
                pacman++;
            }
            if (msg.charAt(i) == '[' || msg.charAt(i) == ']') {
                corchete++;
            }
            if (msg.charAt(i) == '{' || msg.charAt(i) == '}') {
                llave++;
            }
            if (msg.charAt(i) == '-') {
                guionMedio++;
            }
            if (msg.charAt(i) == '_') {
                guionBajo++;
            }
        }
        if (msg != null) {
            if (comillas === 0 && pacman == 0 && corchete === 0 && llave === 0 && guionMedio === 0 && guionBajo === 0) {
                if (validator.isLength(msg, { min: 5, max: 100 })) {
                    var newMessagePrivado = new ChatPrivado({
                        nick: socket.nickname,
                        msg: data,
                        privado: socket.nickname,
                    });
                    await newMessagePrivado.save();
                    io.sockets.emit("new-message-admin-from-user", {
                        msg: data,
                        nick: socket.nickname,
                    });
                    io.sockets.emit("new-message-user-from-user", {
                        msg: data,
                        nick: socket.nickname,
                    });
                } else {
                    cb("Error! El largo del mensaje debe de ser de 5-100");
                }
            } else {
                cb('Error! No se permiten los simbolos " <> [] {} - _ ');
            }
        } else {
            cb("Error! El mensaje esta vacio");
        }
    });
    socket.on("disconnect", (data) => {
        if (!socket.nickname) return;
        delete users[socket.nickname];
        updateNicknames();
    });

    function updateNicknames() {
        console.log("enviando emit");
        io.sockets.emit("usernames", Object.keys(users));
    }
});