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
}
