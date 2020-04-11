import mongoose from "mongoose";
import { getHostDataBase } from "../environment/environment";

const mongodbConfig = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: 'myuser',
    pass: 'myuser',
    dbName: 'mydb'
}

mongoose.connect(`mongodb://${getHostDataBase()}/mydb`,mongodbConfig).then(() => console.log('conectado com sucesso ao banco de dados!')).catch(e => console.log(e));

export default mongoose