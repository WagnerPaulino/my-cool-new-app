import express, { Request, Response } from "express";
import ListaDesejo from "../models/lista-desejos";
import Usuario from '../models/usuario';
// const listaDesejo = require('../models/lista-desejos');
const router = express.Router();

router.post('/lista-desejos', async (req: Request, res: Response) => {
    try {
        let { desejo, usuario } = req.body;
        desejo.usuario = await Usuario.findOneAndUpdate(usuario, usuario, { upsert: true });
        desejo = await ListaDesejo.create(desejo);
        return res.send({ desejo });
    } catch (err) {
        return res.status(400).send({ ...err });
    }
});

router.delete('/lista-desejos/:id', async (req: Request, res: Response) => {
    try {
        await ListaDesejo.deleteOne({ _id: req.params.id });
        return res.status(200).send({});
    } catch (err) {
        return res.status(400).send({ ...err });
    }
});

router.get('/lista-desejos', async (_req: Request, res: Response) => {
    let listaDesejos = await ListaDesejo.find();
    res.status(200).send(listaDesejos);
});

router.get('/lista-desejos/:id', async (req: Request, res: Response) => {
    let listaDesejos = await ListaDesejo.findOne({ _id: req.params.id });
    res.status(200).send(listaDesejos);
});

// module.exports = app => app.use('/api', router);
export default router;