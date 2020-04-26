import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import routerListaDesejo from "./controllers/lista-desejo";
import routerUsuario from "./controllers/usuario"

const app = express();
app.use(json({ type: 'application/json' }));
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use('/api', [routerListaDesejo, routerUsuario]);
// require('./controllers/lista-desejo')(app);
app.listen(3000);
