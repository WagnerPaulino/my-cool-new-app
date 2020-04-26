import express, { Request, Response } from "express";
import Usuario from "../models/usuario";
const routerUsuario = express.Router();

routerUsuario.post('/login', async (_req: Request, _res: Response) => {
    let usuario = _req.body
    usuario = await Usuario.findOneAndUpdate({ 'nome': usuario.nome }, usuario, { upsert: true });
    return _res.send({ usuario });
})

export default routerUsuario;