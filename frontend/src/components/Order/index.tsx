import React from "react";

export interface Order {
  id: string;
}

export default function OrderView({ id }: Order) {
  return (
    <div>
      <p>Order ID: {id}</p>
    </div>
  );
}
