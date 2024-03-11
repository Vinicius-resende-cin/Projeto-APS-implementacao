import express from "express";
import * as Notifier from "./controllers/notification";
import User from "./models/user";
import Order from "./models/order";

var cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const registerServiceDiscovery = async () => {
  const serviceName = "notification";
  const servicePort = 3102;

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

app.post("/orderStatusChange", (req, res) => {
  if (!req.body.user || !req.body.order) {
    res.status(400).send("Bad request");
    throw new Error("Bad request");
  }

  console.log(
    `Notificando usuário ${req.body.user.id} sobre a mudança de status do pedido ${req.body.order.id}...`
  );

  const user = new User(
    req.body.user.id,
    req.body.user.name,
    req.body.user.type,
    req.body.user.apartment,
    req.body.user.email
  );

  const order = new Order(
    req.body.order.id,
    req.body.order.name,
    req.body.order.status,
    req.body.order.userID,
    req.body.order.description,
    req.body.order.image
  );

  Notifier.orderStatusChange(user, order);
  res.send("ok");
});

app.listen(3102, () => {
  console.log("Servidor rodando na porta 3102");
});
