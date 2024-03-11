import express from "express";

var cors = require("cors");

const app = express();

import { router } from "./routes/routes";

app.use(express.json());
app.use(cors());

const registerServiceDiscovery = async () => {
  const serviceName = "order";
  const servicePort = 3101;

  await fetch(`http://discovery:3001/?name=${serviceName}&port=${servicePort}`, {
    method: "POST"
  })
    .then(() => {
      console.log("Service registered");
    })
    .catch((err) => {
      console.error("Error registering service", err);
    });
};
registerServiceDiscovery();

app.use(router);

app.listen(3101, () => {
  console.log("Servidor rodando na porta 3101");
});
