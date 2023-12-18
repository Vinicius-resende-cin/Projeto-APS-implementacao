import express from "express"
import * as controllers from '../controllers/order'
import * as data  from '../data/order'
const router = express.Router()

// Instancia repositório e collection
const orderRepositoryBDR = new data.OrderRepositoryBDR();
const orderCollection = new data.OrderCollection(orderRepositoryBDR);

// Instancia controllers
const orderRegisterController = new controllers.OrderRegisterController(orderCollection);
const orderDetailsController = new controllers.OrderDetailsController(orderCollection);
const orderListController = new controllers.OrderListController(orderCollection);
const orderArrivedController = new controllers.OrderArrivedController(orderCollection);
const orderCancelController = new controllers.OrderCancelController(orderCollection);

// Define routers
router.post('/order/register', orderRegisterController.create.bind(orderRegisterController))
router.get('/order/list', orderListController.list.bind(orderListController))
router.get('/order/details', orderDetailsController.get.bind(orderDetailsController))
router.post('/order/arrived', orderArrivedController.arrived.bind(orderArrivedController))
router.post('/order/cancel', orderCancelController.cancel.bind(orderCancelController))

export { router }