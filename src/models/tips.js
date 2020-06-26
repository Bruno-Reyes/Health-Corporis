const mongoose = require('mongoose')
const { Schema } = mongoose;

const TipSchema = new Schema({
    Titulo: { type: String },
    Descripcion: { type: String }
})

module.exports = mongoose.model('Tip', TipSchema)