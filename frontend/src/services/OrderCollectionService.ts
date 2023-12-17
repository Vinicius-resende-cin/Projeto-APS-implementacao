import { Order } from "../components/Order";
import { serverUrl } from "../config";

export default class OrderCollection {
  static async getOrders() {
    const response = await fetch(`${serverUrl}/api/order`);
    return await response.json();
  }

  static async getOrder(id: string) {
    const response = await fetch(`${serverUrl}/api/order?id=${id}`);
    return await response.json();
  }

  static async updateOrder(id: string, order: Order) {
    const response = await fetch(`${serverUrl}/api/order?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    return await response.json();
  }

  static async addOrder(order: Order) {
    const response = await fetch(`${serverUrl}/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    return await response.json();
  }

  static async deleteOrder(id: string) {
    const response = await fetch(`${serverUrl}/api/order?id=${id}`, {
      method: "DELETE",
    });
    return await response.json();
  }
}
