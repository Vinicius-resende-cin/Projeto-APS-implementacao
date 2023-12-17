import React from "react";
import { useState, useEffect } from "react";
import OrderView, { Order } from "../../components/Order";
import OrderCollection from "../../services/OrderCollectionService";

export default function OrderDetails() {
  const params = new URLSearchParams(document.location.search);
  const orderId = params.get("orderId");
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    if (!orderId) return;
    OrderCollection.getOrder(orderId).then((order) => {
      setOrder(order);
    });
  }, [orderId]);

  return (
    <div>
      <h1>Order Details</h1>
      {order && <OrderView {...order} />}
    </div>
  );
}
