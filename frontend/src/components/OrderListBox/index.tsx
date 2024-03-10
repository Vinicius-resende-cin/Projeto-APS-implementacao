import { Grid, Typography } from "@mui/material";

export interface OrderListBoxProps {
  id: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  onOpenModal: (orderId: string) => void;
}

export default function OrderListBox(props: OrderListBoxProps) {
  return (
    <Grid
      container
      width="100%"
      sx={{
        cursor: "pointer",

        transition: "transform 0.3s ease",
        background: "white",
        "&:hover": { background: "#f0f0f0", transform: "translateX(10px)" },

        "@media (max-width: 600px)": {
          gap: "0.5rem",
        },
      }}
      padding="1rem"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
      margin="0.5rem"
      onClick={() => {
        props.onOpenModal(props.id);
      }}
    >
      <Grid item xs={6} md={3}>
        <Typography variant="subtitle2" fontFamily="inherit" textAlign="start">
          Id do Pedido: <br />{" "}
          <span style={{ fontWeight: "700" }}>{props.id}</span>
        </Typography>
      </Grid>
      <Grid item xs={5} md={3}>
        <Typography variant="subtitle2" fontFamily="inherit" textAlign="start">
          Registrado em: <br />
          <span style={{ fontWeight: "700" }}>{props.createdAt}</span>
        </Typography>
      </Grid>
      <Grid item xs={6} md={3}>
        <Typography variant="subtitle2" fontFamily="inherit" textAlign="start">
          Nome do Morador: <br />
          <span style={{ fontWeight: "700" }}> {props.userName}</span>
        </Typography>
      </Grid>
      <Grid item xs={5} md={3}>
        <Typography variant="subtitle2" fontFamily="inherit" textAlign="start">
          Última Atualização:
          <br /> <span style={{ fontWeight: "700" }}> {props.updatedAt}</span>
        </Typography>
      </Grid>
    </Grid>
  );
}
