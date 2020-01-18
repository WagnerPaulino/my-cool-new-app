const express = require('express');
const listaDesejo = require('../models/lista-desejos');
const router = express.Router();

router.post('/lista-desejo', async (req, res) => {
    try{
        const desejo = await listaDesejo.create(req.body);
        return res.send({desejo});
    } catch (err) {
        return res.status(400).send({...err});
    }
});

module.exports = app => app.use('/api', router);