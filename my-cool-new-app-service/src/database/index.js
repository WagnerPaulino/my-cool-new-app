const mongoose = require('mongoose');

const mongodbConfig = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: 'myuser',
    pass: 'myuser',
    dbName: 'mydb'
}

mongoose.connect('mongodb://db:27017/mydb',mongodbConfig).then(r => console.log('conectado com sucesso ao banco de dados!')).catch(e => console.log(e));

module.exports = mongoose;