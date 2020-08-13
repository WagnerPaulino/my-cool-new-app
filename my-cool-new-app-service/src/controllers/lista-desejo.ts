import express, { Request, Response } from "express";
import ListaDesejo from "../models/lista-desejos";
import Usuario from '../models/usuario';
// const listaDesejo = require('../models/lista-desejos');
const routerListaDesejo = express.Router();

const baseUrl = '/lista-desejos';

routerListaDesejo.post(`${baseUrl}`, async (req: Request, res: Response) => {
    try {
        let { desejo, usuario } = req.body;
        desejo.usuario = await Usuario.findOneAndUpdate(usuario, usuario, { upsert: true });
        desejo = await ListaDesejo.create(desejo)
        return res.send({ desejo });
    } catch (err) {
        return res.status(400).send({ ...err });
    }
});

routerListaDesejo.post(`${baseUrl}/find-by-nome`, async (req: Request, res: Response) => {
    try {
        let { nome } = req.body;
        let listaDesejos = await ListaDesejo.find({ 'nome': nome });
        return res.status(200).send(listaDesejos);
    } catch (err) {
        return res.status(400).send({ ...err });
    }
});

routerListaDesejo.delete(`${baseUrl}/:id`, async (req: Request, res: Response) => {
    try {
        await ListaDesejo.deleteOne({ _id: req.params.id });
        return res.status(200).send({});
    } catch (err) {
        return res.status(400).send({ ...err });
    }
});

routerListaDesejo.get(`${baseUrl}`, async (_req: Request, res: Response) => {
    let listaDesejos = await ListaDesejo.find();
    res.status(200).send(listaDesejos);
});

routerListaDesejo.post(`${baseUrl}/findAll`, async (_req: Request, res: Response) => {
    let listaDesejos = await ListaDesejo.find({ 'usuario.nome': _req.body.nome });
    res.status(200).send(listaDesejos);
});

routerListaDesejo.get(`${baseUrl}/:id`, async (req: Request, res: Response) => {
    let listaDesejos = await ListaDesejo.findOne({ _id: req.params.id });
    res.status(200).send(listaDesejos);
});

// module.exports = app => app.use('/api', router);
export default routerListaDesejo;