import * as express from "express";
import * as dotenv from "dotenv";
import * as controllers from "../controllers/order";
import * as orderData from "../data/order";
import * as userData from "../data/user";
import {
  AbstractRepositoryFactory,
  BDRRepositoryFactory,
  NRRepositoryFactory
} from "../data/RepositoryFactory";

dotenv.config({ path: require.main === module ? "../.env" : "./src/.env" });
const DB_TYPE = process.env.DB_TYPE || "BDR";

const router = express.Router();

// Instancia repositório (com abstract factory) e collection
console.log(DB_TYPE);
let repositoryFactory: AbstractRepositoryFactory =
  DB_TYPE === "BDR" ? new BDRRepositoryFactory() : new NRRepositoryFactory();

const orderRepositoryBDR = repositoryFactory.createOrderRepository();
const orderCollection = new orderData.OrderCollection(orderRepositoryBDR);

const userRepositoryBDR = repositoryFactory.createUserRepository();
const userCollection = new userData.UserCollection(userRepositoryBDR);

// Instancia controllers
const orderRegisterController = new controllers.OrderRegisterController(orderCollection);
const orderDetailsController = new controllers.OrderDetailsController(orderCollection);
const orderListController = new controllers.OrderListController(orderCollection, userCollection);
const orderArrivedController = new controllers.OrderArrivedController(orderCollection);
const orderCancelController = new controllers.OrderCancelController(orderCollection);

// Define routers
router.post("/order/register", orderRegisterController.create.bind(orderRegisterController));
router.get("/order/list", orderListController.list.bind(orderListController));
router.get("/order/details", orderDetailsController.get.bind(orderDetailsController));
router.put("/order/arrived", orderArrivedController.arrived.bind(orderArrivedController));
router.delete("/order/cancel", orderCancelController.cancel.bind(orderCancelController));
router.put("/order/update", orderDetailsController.update.bind(orderDetailsController));

export { router };
