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

ListaDesejoSchema.pre('save', function (next) {
    console.log(this); // this: se refere ao objeto que está sendo salvo
    next();
})

const ListaDesejo = mongoose.model('ListaDesejo', ListaDesejoSchema);
module.exports = ListaDesejo;