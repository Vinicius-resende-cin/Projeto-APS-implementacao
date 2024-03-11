import { useState, useEffect } from "react";
import OrderView, { Order } from "../../components/Order";
import Modal from "@mui/material/Modal";

import ImageCapture from "../../components/Image/ImageCapture";
import OrderDetailsPresenter from "../../presenters/OrderDetailsPresenter";
import { Box } from "@mui/material";

export interface OrderDetailsProps {
  orderId: string;
  open: boolean;
  onClose: () => void;
}
export default function OrderDetails(props: OrderDetailsProps) {
  const [order, setOrder] = useState<Order>();
  const { orderId } = props;

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
    const handleCloseOnOutsideClick = (event: MouseEvent) => {
      if ((event.target! as Element).classList.contains("modal-backdrop")) {
        props.onClose();
      }
    };
    document.addEventListener("mousedown", handleCloseOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleCloseOnOutsideClick);
    };
  }, [props]);

  useEffect(() => {
    if (!orderId) return;
    OrderDetailsPresenter.getOrder(orderId).then((order: any) => {
      console.log("reach 1", order)
      setOrder(order);
      console.log("reach 2")
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
  console.log(order);
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100vh"
        onClick={props.onClose}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <ImageCapture />
          {order && (
            <OrderView order={order} onUpdateStatus={handleStatusUpdate} />
          )}
        </div>
      </Box>
    </Modal>
  );
}
