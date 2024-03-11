import User from "../models/user";
import Order from "../models/order";
import * as CircuitBreaker from "./circuitBreaker";

export async function orderStatusChange(user: User, order: Order): Promise<void> {
  const notificationServiceAddress = await CircuitBreaker.getNotificationServiceAddress();
  if (!notificationServiceAddress) throw new Error("Notification service address not found");

  console.log(`Notificando usuário ${user.id} sobre a mudança de status do pedido ${order.id}...`);
  await fetch(`http://${notificationServiceAddress}/orderStatusChange`, {
    method: "POST",
    body: JSON.stringify({ user: user, order: order }),
    headers: { "Content-Type": "application/json" }
  });
}
