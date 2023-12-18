import OrderDetailsController from "./OrderDetailsController";
import OrderRegisterController from "./OrderRegisterController";
import ImageController from "./ImageController";
import { Order } from "../components/Order";

export default class Facade {
  public static getOrders() {
    return OrderDetailsController.getOrders();
  }

  public static getOrder(id: string) {
    return OrderDetailsController.getOrder(id);
  }

  public static addOrder(order: Order) {
    return OrderRegisterController.addOrder(order);
  }

  public static updateOrder(id: string, order: Order) {
    return OrderDetailsController.updateOrder(id, order);
  }

  public static deleteOrder(id: string) {
    return OrderRegisterController.deleteOrder(id);
  }

  public static openCamera() {
    return ImageController.openCamera();
  }
}
