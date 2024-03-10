import { useState, useEffect } from "react";
import OrderView, { Order } from "../../components/Order";
import ImageCapture from "../../components/Image/ImageCapture";
import OrderDetailsPresenter from "../../presenters/OrderDetailsPresenter";

export default function OrderDetails() {
  const params = new URLSearchParams(document.location.search);
  const orderId = params.get("orderId");
  const [order, setOrder] = useState<Order>();

  const handleStatusUpdate = async (updatedStatus: string) => {
    if (order && order.id) {
      try {
        const newOrder = {
          ...order,
          status: updatedStatus,
        };
        OrderDetailsPresenter.updateOrder(order.id, newOrder).then(() => {
          setOrder(newOrder);
        });
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }
  };

  useEffect(() => {
    if (!orderId) return;
    OrderDetailsPresenter.getOrder(orderId).then((order) => {
      setOrder(order);
    });
    // setOrder({
    //   id: orderId,
    //   name: "test",
    //   description: "test",
    //   userID: "test",
    //   status: "test",
    //   // image: "test",
    // });
  }, [orderId]);

  return (
    <>
      <ImageCapture />
      {/* <h1>Order Details</h1> */}
      {order && <OrderView order={order} onUpdateStatus={handleStatusUpdate} />}
    </>
  );
}
