import mongoose from "../database/index";
import Usuario from "./usuario";

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
    }
});

const ListaDesejo = mongoose.model('ListaDesejo', ListaDesejoSchema);

export default ListaDesejo;