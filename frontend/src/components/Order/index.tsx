import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { StyledCard, StyledCardContainer } from "./styles";
import { useState } from "react";
import ImagePresenter from "../../presenters/ImagePresenter";

export interface Order {
  id: string;
  name: string;
  description: string;
  userID: string;
  status: string;
  image?: Blob;
}

interface OrderViewProps {
  order: Order;
  onUpdateStatus: (updatedStatus: string) => void;
}

export default function OrderView({ order, onUpdateStatus }: OrderViewProps) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order.status);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleImageCapture = () => {
    ImagePresenter.openCamera();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusUpdate = () => {
    onUpdateStatus(selectedStatus);
    handleClose();
  };

  return (
    <div>
      <StyledCard>
        <StyledCardContainer>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" textAlign="center" fontFamily="inherit">
                ID do Pedido: {order.id}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                component="label"
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
                  fontFamily: "inherit",
                }}
                onClick={handleImageCapture}
              >
                Tirar Foto
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Box
                component="img"
                id="captured-image"
                sx={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
                src=""
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                textAlign="center"
                fontFamily="inherit"
                fontWeight={600}
              >
                Status:
              </Typography>
              <Typography
                variant="body1"
                textAlign="center"
                fontFamily="inherit"
              >
                {order.status}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                textAlign="center"
                fontFamily="inherit"
                fontWeight={600}
              >
                User:
              </Typography>
              <Typography
                textAlign="center"
                fontFamily="inherit"
                variant="body1"
              >
                {order.userID}
              </Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            sx={{
              marginTop: "1rem",
              borderRadius: "0",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              padding: "0.5rem 1rem",
              background: "#1976D2",
              color: "white",
              "&:hover": {
                background: "#00BCD4",
              },
              fontFamily: "inherit",
            }}
            onClick={handleOpen}
          >
            Atualizar Status
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle fontFamily="inherit">Atualizar Status</DialogTitle>
            <DialogContent>
              <RadioGroup value={selectedStatus} onChange={handleStatusChange}>
                <FormControlLabel
                  value="Pending"
                  control={<Radio />}
                  label="Pendente"
                />
                <FormControlLabel
                  value="Delivered"
                  control={<Radio />}
                  label="Entregue"
                />
                <FormControlLabel
                  value="Processing"
                  control={<Radio />}
                  label="Em processamento"
                />
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                color="primary"
                sx={{ fontFamily: "inherit" }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleStatusUpdate}
                color="primary"
                sx={{ fontFamily: "inherit" }}
                autoFocus
              >
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        </StyledCardContainer>
      </StyledCard>
    </div>
  );
}
