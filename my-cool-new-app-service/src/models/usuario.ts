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

UsuarioSchema.pre('save', function (next) {
    console.log(this);
    next();
})

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;