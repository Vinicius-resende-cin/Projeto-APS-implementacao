// import React from "react";
import { useState, useEffect } from "react";
import OrderView, { Order } from "../../components/Order";
import OrderCollection from "../../services/OrderCollectionService";
import ImageCapture from "../../components/Image/ImageCapture";

export default function OrderDetails() {
  const params = new URLSearchParams(document.location.search);
  const orderId = params.get("orderId");
  const [order, setOrder] = useState<Order>();

  const handleStatusUpdate = async (updatedStatus: string) => {
    if (order && order.id) {
      try {
        await setOrder((prevOrder: Order | undefined) => {
          if (prevOrder) {
            return {
              ...prevOrder,
              status: updatedStatus
            };
          }
          return prevOrder;
        });
        await OrderCollection.updateOrder(order.id, order);
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }
  };

  useEffect(() => {
    if (!orderId) return;
    // OrderCollection.getOrder(orderId).then((order) => {
    //   setOrder(order);
    // });

    setOrder({
      id: orderId,
      name: "Order Name",
      description: "Order Description",
      user: "John Doe",
      status: "Pending"
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
