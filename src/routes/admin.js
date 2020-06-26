const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../lib/auth");
const pool = require("../../database");
const validator = require("validator");
const multer = require("multer");
const path = require("path");
const uuid = require("uuid/v1");
const fs = require("fs");
const swal = require("sweetalert");

//Upload image
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/img"),
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});
const configMulter = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error el archivo debe ser una imagen");
    }
  },
}).single("image");

//Chat
router.get("/users/chat", isLoggedIn, async (req, res) => {
  req.app.locals.layout = "admin";
  res.render("admin/chatAdmin");
});

//List of exercises
router.get("/exercises", isLoggedIn, async (req, res) => {
  const quemagrasa = await pool.query("select id_eje,nom_eje,img_eje,des_eje,series,cantidad,intensidad,tip_med from Ejercicio natural join Intensidad natural join Medicion where id_int=2")
  const cardio = await pool.query("select id_eje,nom_eje,img_eje,des_eje,series,cantidad,intensidad,tip_med from Ejercicio natural join Intensidad natural join Medicion where id_int=3")
  const altoRend = await pool.query("select id_eje,nom_eje,img_eje,des_eje,series,cantidad,intensidad,tip_med from Ejercicio natural join Intensidad natural join Medicion where id_int=4")
  req.app.locals.layouts = "admin";
  res.render("admin/exercises.hbs", { quemagrasa,cardio,altoRend });
})

//Add Exercise
router.get("/addExercise", isLoggedIn, async (req, res) => {
  req.app.locals.layouts = "admin";
  res.render("admin/addExercise.hbs");
});
//Form Add Exercise
router.post("/addExercise", isLoggedIn, configMulter, async (req, res) => {
  let {
    nomeje,
    description,
    series,
    cantidad,
    intensidad,
    medicion,
  } = req.body;

  try {
    var validate_nomEje = !validator.isEmpty(nomeje);
    var validate_imgEje = !validator.isEmpty(req.file.filename);
    var validate_desEje = !validator.isEmpty(description);
    var validate_series = !validator.isEmpty(series);
    var validate_cantidad = !validator.isEmpty(cantidad);
    var validate_idInt = !validator.isEmpty(intensidad);
    var validate_idMed = !validator.isEmpty(medicion);
  } catch (err) {
    return res.status(200).send({
      status: "error",
      message: "Faltan Datos",
    });
  }

  if (
    validate_nomEje &&
    validate_imgEje &&
    validate_desEje &&
    validate_series &&
    validate_cantidad &&
    validate_idInt &&
    validate_idMed
  ) {
    let newExercise = {
      nom_eje: "",
      img_eje: "",
      des_eje: "",
      series: 0,
      cantidad: 0,
      id_int: 0,
      id_med: 0,
    };

    newExercise.nom_eje = nomeje;
    newExercise.img_eje = "/img/" + req.file.filename;
    newExercise.des_eje = description;
    newExercise.series = series;
    newExercise.cantidad = cantidad;
    newExercise.id_int = intensidad;
    newExercise.id_med = medicion;

    await pool.query("insert into Ejercicio set ?", [newExercise]);
    req.flash(
      "Success",
      `El ejercicio ${newExercise.nom_eje} se agregó con éxito`
    );
    res.redirect("/admin/exercises");
  } else {
    req.flash("Error", `Faltan Datos`);
    res.redirect("/admin/addExercise");
  }
});

//Edit
router.get("/editExercise/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const exercise = await pool.query(
    "SELECT * FROM Ejercicio WHERE id_eje = ?",
    [id]
  );
  res.render("admin/editExercise.hbs", { exercise: exercise[0] });
});
router.post("/editExercise/:id", isLoggedIn, configMulter, async (req, res) => {
  const { id } = req.params;
  let {
    nomeje,
    description,
    series,
    cantidad,
    intensidad,
    medicion,
  } = req.body;
  try {
    var validate_nomEje = !validator.isEmpty(nomeje);
    var validate_imgEje = !validator.isEmpty(req.file.filename);
    var validate_desEje = !validator.isEmpty(description);
    var validate_series = !validator.isEmpty(series);
    var validate_cantidad = !validator.isEmpty(cantidad);
    var validate_idInt = !validator.isEmpty(intensidad);
    var validate_idMed = !validator.isEmpty(medicion);
  } catch (err) {
    return res.status(200).send({
      status: "error",
      message: "Faltan Datos",
    });
  }
  if (
    validate_nomEje &&
    validate_imgEje &&
    validate_desEje &&
    validate_series &&
    validate_cantidad &&
    validate_idInt &&
    validate_idMed
  ) {
    let editExercise = {
      nom_eje: "",
      img_eje: "",
      des_eje: "",
      series: 0,
      cantidad: 0,
      id_int: 0,
      id_med: 0,
    };
    editExercise.nom_eje = nomeje;
    editExercise.img_eje = "/img/" + req.file.filename;
    editExercise.des_eje = description;
    editExercise.series = series;
    editExercise.cantidad = cantidad;
    editExercise.id_int = intensidad;
    editExercise.id_med = medicion;
    console.log(editExercise);
    await pool.query("UPDATE Ejercicio set ? WHERE id_eje = ?", [
      editExercise,
      id,
    ]);
    req.flash(
      "Success",
      `El ejercicio ${editExercise.nom_eje} se edito con éxito`
    );
    res.redirect("/admin/exercises");
  } else {
    req.flash("Error", `Faltan Datos`);
    res.redirect("/admin/addExercise");
  }
});

//Delete
router.get("/delete/exercise/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  /* const dir_img = await pool.query(
    "SELECT img_eje,nom_eje from Ejercicio where id_eje =?",
    [id]
  );
  const dir = path.join(__dirname, "../public" + dir_img[0].img_eje);
  fs.unlink(dir, (err) => {
    if (err) throw err;${dir_img[0].nom_eje}
  }); */
  await pool.query("DELETE FROM Ejercicio WHERE id_eje = ?", [id]);
  req.flash(
    "Success",
    `Ejercicio /*  */ eliminado correctamente`
  );
  res.redirect("/admin/exercises");
});

router.get("/consejos", isLoggedIn, async (req, res) => {
  req.app.locals.layouts = "admin";
  res.render("admin/tips.hbs");
});

router.get("/addConsejos", isLoggedIn, async (req, res) => {
  req.app.locals.layouts = "admin";
  res.render("admin/addTip.hbs");
});

router.get("/graficas", isLoggedIn, async (req, res) => {
  req.app.locals.layouts = "admin";
  res.render("admin/graficas.hbs");
});

router.get("/usuarios", isLoggedIn, async (req, res) => {
  let usuarios = await pool.query(
    "SELECT * FROM Usuario natural join Persona natural join Genero natural join FrecuenciaEjercicio natural join Enfermedades WHERE id_tdu = 2"
  );
  req.app.locals.layouts = "admin";
  res.render("admin/usuarios.hbs", { usuarios });
});

module.exports = router;
