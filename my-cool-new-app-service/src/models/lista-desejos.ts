import mongoose from "../database/index";
import Usuario from "./usuario";

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
    usuario: Usuario.schema
});

ListaDesejoSchema.pre('save', function (next) {
    console.log(this);
    next();
})

const ListaDesejo = mongoose.model('ListaDesejo', ListaDesejoSchema);

export default ListaDesejo;