import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import OrderListBox from "../../components/OrderListBox";
import OrderDetailsPresenter from "../../presenters/OrderDetailsPresenter";
import { useEffect, useState } from "react";
import { Order } from "../../components/Order";

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);

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
        (order) => order.status === "delivered"
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
    <Box
      display="flex"
      flexDirection="column"
      width="100vw"
      height="100%"
      padding="3rem"
      sx={{
        // height: "100vh",
        backgroundColor: "#e5e5f7", // Light blue background
        opacity: "0.8",
        "@media (max-width: 600px)": {
          alignItems: "center",
        },
        //   , // This blends the background image with the base color
        //     background:
        //       "repeating-linear-gradient(-45deg, #444cf7, #444cf7 20px, #e5e5f7 20px, #e5e5f7 100px)",
      }}
    >
      <Box
        display="flex"
        width="95%"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="2rem"
        gap="1rem"
      >
        <Typography
          variant="h4"
          fontFamily="inherit"
          fontWeight={700}
          color=" dark brown"
          sx={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            textAlign: "center",
          }}
        >
          Histórico de pedidos
        </Typography>

        <Button
          sx={{
            borderRadius: "0",
            boxShadow: "0px 10px 20px -5px rgba(0, 0, 0, 0.1)",
            padding: "0.5rem 1rem",
            background: "#2196F3",
            color: "white",
            "&:hover": {
              background: "#1976D2", // New background color on hover
            },
          }}
        >
          {/* <AddIcon /> */}
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
      {filteredOrders.map((order) => (
        <OrderListBox
          key={order.id}
          id={order.id}
          createdAt={"2021-10-01"}
          updatedAt={"2021-10-01"}
          userName={order.userID}
        />
      ))}
      {/* <OrderListBox
        id="1"
        createdAt="2021-10-01"
        updatedAt="2021-10-01"
        userName="João"
      /> */}
    </Box>
  );
}
