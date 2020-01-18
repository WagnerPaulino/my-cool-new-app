const mongoose = require('mongoose');

const mongodbConfig = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect('mongodb://127.0.0.1:27017/lista-desejos',mongodbConfig);

module.exports = mongoose;