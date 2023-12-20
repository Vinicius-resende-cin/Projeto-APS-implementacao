import { useState, useEffect } from "react";
import OrderView, { Order } from "../../components/Order";
import ImageCapture from "../../components/Image/ImageCapture";
import Facade from "../../controllers/Facade";

export default function OrderDetails() {
  const params = new URLSearchParams(document.location.search);
  const orderId = params.get("orderId");
  const [order, setOrder] = useState<Order>();

  const handleStatusUpdate = async (updatedStatus: string) => {
    if (order && order.id) {
      try {
        const newOrder = {
          ...order,
          status: updatedStatus
        };
        Facade.updateOrder(order.id, newOrder).then(() => {
          setOrder(newOrder);
        });
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }
  };

  useEffect(() => {
    if (!orderId) return;
    Facade.getOrder(orderId).then((order) => {
      setOrder(order);
    });
  }, [orderId]);

  return (
    <div>
      <ImageCapture />
      <h1>Order Details</h1>
      {order && <OrderView order={order} onUpdateStatus={handleStatusUpdate} />}
    </div>
  );
}
