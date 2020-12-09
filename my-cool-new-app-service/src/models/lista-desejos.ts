import mongoose from "../database/index";
import Usuario from "./usuario";
import Loja from "./loja";

const ListaDesejoSchema = new mongoose.Schema({
    nome: {
        type: String,
        unique: false,
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
    usuario: {
        type: Usuario.schema,
        required: true
    },
    lojas: [{
        type: Loja.schema,
        unique: false,
        required: false
    }]
});

const ListaDesejo = mongoose.model('ListaDesejo', ListaDesejoSchema);

export default ListaDesejo;