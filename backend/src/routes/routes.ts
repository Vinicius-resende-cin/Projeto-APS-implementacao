import express from "express";
import "dotenv/config";
import * as controllers from "../controllers/order";
import * as data from "../data/order";
import {
  AbstractRepositoryFactory,
  BDRRepositoryFactory,
  NRRepositoryFactory
} from "../data/RepositoryFactory";
const router = express.Router();

// Instancia repositório (com abstract factory) e collection
let repositoryFactory: AbstractRepositoryFactory =
  process.env.DB_TYPE === "BDR" ? new BDRRepositoryFactory() : new NRRepositoryFactory();

const orderRepositoryBDR = repositoryFactory.createOrderRepository();
const orderCollection = new data.OrderCollection(orderRepositoryBDR);

// Instancia controllers
const orderRegisterController = new controllers.OrderRegisterController(orderCollection);
const orderDetailsController = new controllers.OrderDetailsController(orderCollection);
const orderListController = new controllers.OrderListController(orderCollection);
const orderArrivedController = new controllers.OrderArrivedController(orderCollection);
const orderCancelController = new controllers.OrderCancelController(orderCollection);

// Define routers
router.post("/order/register", orderRegisterController.create.bind(orderRegisterController));
router.get("/order/list", orderListController.list.bind(orderListController));
router.get("/order/details", orderDetailsController.get.bind(orderDetailsController));
router.put("/order/arrived", orderArrivedController.arrived.bind(orderArrivedController));
router.delete("/order/cancel", orderCancelController.cancel.bind(orderCancelController));

export { router };
