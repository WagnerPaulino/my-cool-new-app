const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./controllers/lista-desejo')(app);

app.listen(3000);