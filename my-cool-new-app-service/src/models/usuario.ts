import mongoose from "../database/index";

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        unique: true,
        required: true
    },
    senha: {
        type: String,
        unique: false,
        required: false
    },
    lastLoginAt: {
        type: Date,
        default: Date.now
    }
});

UsuarioSchema.pre('save', function (next) {
    console.log(this);
    next();
})

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;