import mongoose from "../database/index";

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    lastLoginAt: {
        type: Date,
        default: Date.now
    }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;