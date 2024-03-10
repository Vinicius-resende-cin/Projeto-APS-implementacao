import { OrderCollection } from "../data/order";
import Order from "../models/order";
import * as User from "../data/user";
import * as Notification from "../services/notification";
import { UserCollection } from "../data/user";

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
  private userCollection: UserCollection; // Assuming you have a UserCollection class to manage users

  constructor(
    orderCollection: OrderCollection,
    userCollection: UserCollection
  ) {
    this.orderCollection = orderCollection;
    this.userCollection = userCollection;
  }

  async list(req: any, res: any) {
    const userId = req.query.userId; // Retrieve userId from request parameters
    console.log(`Listando orders para o usuário ${userId}...`);

    try {
      const user = await this.userCollection.read(userId); // Retrieve user details using userId
      console.log(`Listando orders para o usuário ${user}...`);

      if (!user) {
        return res.status(404).send("User not found");
      }

      let orders: Order[] | null;

      if (
        user &&
        typeof user.type === "string" &&
        ["doorman", "admin"].includes(user.type)
      ) {
        orders = await this.orderCollection.listAll();
      } else {
        orders = await this.orderCollection.listByUserID(userId);
      }

      res.send(orders);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
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
    const order = await this.orderCollection.update({
      id: orderID,
      status: "arrived",
    });
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
