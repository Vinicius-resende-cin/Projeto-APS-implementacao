import { Order } from "../components/Order";
import OrderCollection from "../services/OrderCollectionService";

export default class OrderRegisterController {
  public async addOrder(order: Order): Promise<void> {
    await OrderCollection.addOrder(order);
  }

  public async deleteOrder(id: string): Promise<void> {
    await OrderCollection.deleteOrder(id);
  }
}
