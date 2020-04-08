import mongoose from "../database/index";

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
    },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: false }
});

ListaDesejoSchema.pre('save', function (next) {
    console.log(this); // this: se refere ao objeto que está sendo salvo
    next();
})

const ListaDesejo = mongoose.model('ListaDesejo', ListaDesejoSchema);

export default ListaDesejo;