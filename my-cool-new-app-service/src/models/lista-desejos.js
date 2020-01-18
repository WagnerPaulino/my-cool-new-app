const mongoose = require('../database/index');

const ListaDesejoSchema = new mongoose.Schema({
   nome: {
       type: String,
       unique: true,
       required: true
   },
   preco: {
       type: Number,
       required: true
   },
   createdAt: {
       type: Date,
       default: Date.now
   }
});

const ListaDesejo = mongoose.model('ListaDesejo', ListaDesejoSchema);
module.exports = ListaDesejo;