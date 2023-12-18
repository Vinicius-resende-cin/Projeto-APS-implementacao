import express from "express";
var cors = require("cors");

const app = express();

import { router } from "./routes/routes";

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(3100, () => {
  console.log("Servidor rodando na porta 3100");
});
