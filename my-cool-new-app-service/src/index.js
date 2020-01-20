const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({extended: false}));

require('./controllers/lista-desejo')(app);

app.listen(3000);