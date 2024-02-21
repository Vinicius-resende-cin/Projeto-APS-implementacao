import { OrderCollection } from "../data/order";
import Order from "../models/order";
import * as User from "../data/user";
import * as Notification from "../services/notification";

export class OrderRegisterController {
  private orderCollection: OrderCollection;

  constructor(orderCollection: OrderCollection) {
    this.orderCollection = orderCollection;
  }

  async create(req: any, res: any) {
    const order = await this.orderCollection.create(req.body);
    // Coleta dados para notificar usuário
    const userRepository = new User.UserRepositoryBDR();
    const userCollection = new User.UserCollection(userRepository);
    const user = await userCollection.read(order.userID);

    if (!user) throw new Error("Usuário não encontrado");

    // Notifica usuário
    await Notification.orderStatusChange(user, order);
    res.send(order);
  }
}

export class OrderListController {
  private orderCollection: OrderCollection;

  constructor(orderCollection: OrderCollection) {
    this.orderCollection = orderCollection;
  }

  async list(req: any, res: any) {
    const user = req.body;
    console.log(`Listando orders para o usuário ${user.id}...`);

    var orders: Order[] | null;

    if (["doorman", "admin"].includes(user.type)) {
      orders = await this.orderCollection.listAll();
    } else {
      orders = await this.orderCollection.listByUserID(user.id);
    }
    res.send(orders);
  }
}

export class OrderDetailsController {
  private orderCollection: OrderCollection;

  constructor(orderCollection: OrderCollection) {
    this.orderCollection = orderCollection;
  }

  async get(req: any, res: any) {
    // console.log(req)
    const orderID = req.query.id;
    console.log(`Exibindo order ${orderID}...`);
    const order = await this.orderCollection.read(orderID);
    res.send(order);
  }

  async update(req: any, res: any) {
    const orderID = req.query.id;
    console.log(`Atualizando order ${orderID}...`);
    const order = await this.orderCollection.update(req.body);
    res.send(order);
  }
}

export class OrderArrivedController {
  private orderCollection: OrderCollection;

  constructor(orderCollection: OrderCollection) {
    this.orderCollection = orderCollection;
  }

  async arrived(req: any, res: any) {
    // Armazena a alteração de status da order
    const orderID = req.query.id;
    const order = await this.orderCollection.update({ id: orderID, status: "arrived" });
    // Coleta dados para notificar usuário
    const userRepository = new User.UserRepositoryBDR();
    const userCollection = new User.UserCollection(userRepository);
    const user = await userCollection.read(order.userID);

    if (!user) throw new Error("Usuário não encontrado");

    // Notifica usuário
    await Notification.orderStatusChange(user, order);
    // Envia order atualizada como resposta
    res.send(order);
  }
}

export class OrderCancelController {
  private orderCollection: OrderCollection;

  constructor(orderCollection: OrderCollection) {
    this.orderCollection = orderCollection;
  }

  async cancel(req: any, res: any) {
    const orderID = req.query.id;
    const order = await this.orderCollection.delete(orderID);
    res.send(order);
  }
}
