import { Order } from "../components/Order";
import OrderCollection from "../services/OrderCollectionService";

export default class OrderDetailsPresenter {
  public static async getOrders(userId: Number): Promise<Order[]> {
    return await OrderCollection.getOrders(userId);
  }

  public static async getOrder(id: string): Promise<Order> {
    return await OrderCollection.getOrder(id);
  }

  public static async updateOrder(id: string, order: Order): Promise<Order> {
    return await OrderCollection.updateOrder(id, order);
  }
}
