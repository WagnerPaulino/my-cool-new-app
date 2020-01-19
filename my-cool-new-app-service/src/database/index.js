const mongoose = require('mongoose');

const mongodbConfig = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: 'myuser',
    pass: 'myuser',
    dbName: 'mydb'
}

mongoose.connect('mongodb://127.0.0.1:27017/mydb',mongodbConfig);

module.exports = mongoose;