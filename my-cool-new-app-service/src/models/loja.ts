import mongoose from "../database";

const LojaSchema = new mongoose.Schema({
    nome: {
        type: String,
        unique: false,
        required: true
    },
    url: {
        type: String,
        unique: false,
        required: false
    }
});

const Loja = mongoose.model('Loja', LojaSchema);

export default Loja;