const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/usuarios',async (req, res) => {

    let query = await pool.query('SELECT * FROM usuario');
    let usuarios = {usuarios:query}
    res.json(usuarios);
});
module.exports = router;