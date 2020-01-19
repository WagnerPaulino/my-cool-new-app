const express = require('express');
const listaDesejo = require('../models/lista-desejos');
const router = express.Router();

router.post('/lista-desejos', async (req, res) => {
    try{
        const desejo = await listaDesejo.create(req.body);
        return res.send({desejo});
    } catch (err) {
        return res.status(400).send({...err});
    }
});

router.get('/lista-desejos', async (req, res) => {
    let listaDesejos = await listaDesejo.find({});
    res.status(200).send(listaDesejos);
});

router.get('/lista-desejos/:id', async (req, res) => {
    let listaDesejos = await listaDesejo.findOne({_id: req.params.id});
    res.status(200).send(listaDesejos);
});

module.exports = app => app.use('/api', router);