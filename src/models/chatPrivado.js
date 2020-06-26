const mongoose = require('mongoose')
const { Schema } = mongoose;

const ChatPrivadoSchema = new Schema({
    nick: { type: String },
    msg: { type: String },
    created_at: { type: Date, default: Date.now },
    privado: { type: String }
})

module.exports = mongoose.model('ChatPrivado', ChatPrivadoSchema)