import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import OrderListBox from "../../components/OrderListBox";
import OrderDetailsPresenter from "../../presenters/OrderDetailsPresenter";
import { useEffect, useState } from "react";
import { Order } from "../../components/Order";
import OrderDetails from "../OrderDetails";

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleOpenModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [selectedTab, orders]);

  function getOrders() {
    OrderDetailsPresenter.getOrders(10).then((orders) => {
      setOrders(orders);
    });
  }

  function filterOrders() {
    if (selectedTab === 0) {
      // Show all orders
      setFilteredOrders(orders);
    } else if (selectedTab === 1) {
      // Filter delivered orders
      const deliveredOrders = orders.filter(
        (order) => order.status === "arrived"
      );
      setFilteredOrders(deliveredOrders);
    } else if (selectedTab === 2) {
      // Filter pending orders
      const pendingOrders = orders.filter(
        (order) => order.status === "pending"
      );
      setFilteredOrders(pendingOrders);
    }
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <OrderDetails
        open={isModalOpen}
        onClose={handleCloseModal}
        orderId={selectedOrderId || ""}
      />

      <Box
        display="flex"
        flexDirection="column"
        width="100vw"
        minHeight="100vh"
        padding="3rem"
        sx={{
          backgroundColor: "#F0F8FF",
          opacity: "0.8",
          "@media (max-width: 600px)": {
            alignItems: "center",
          },
        }}
      >
        <Box
          display="flex"
          width="100%"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="2rem"
          gap="1rem"
        >
          <Typography
            variant="h4"
            fontFamily="inherit"
            fontWeight={600}
            color="#4A4A4A"
            sx={{
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.25)",
              textAlign: "center",
            }}
          >
            Histórico de pedidos
          </Typography>

          <Button
            sx={{
              borderRadius: "0",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",

              padding: "0.5rem 1rem",
              background: "#1976D2",
              color: "white",
              "&:hover": {
                background: "#00BCD4",
              },
            }}
          >
            Registrar Pedido
          </Button>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Todos" />
            <Tab label="Entregues" />
            <Tab label="Pendentes" />
          </Tabs>
        </Box>
        {/* {filteredOrders.map((order) => (
          <OrderListBox
            key={order.id}
            id={order.id}
            createdAt={"2021-10-01"}
            updatedAt={"2021-10-01"}
            userName={order.userID}
            onOpenModal={handleOpenModal}
          />
        ))} */}

        <OrderListBox
          key={"1"}
          id={"1"}
          createdAt={"2021-10-01"}
          updatedAt={"2021-10-01"}
          userName={"heyo"}
          onOpenModal={handleOpenModal}
        />
      </Box>
    </>
  );
}
