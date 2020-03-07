import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import router from "./controllers/lista-desejo";

const app = express();
app.use(json({ type: 'application/json' }));
app.use(urlencoded({extended: false}));
app.use(cors());
app.use('/api', router);
// require('./controllers/lista-desejo')(app);
app.listen(3000);
