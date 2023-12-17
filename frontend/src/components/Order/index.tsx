import {
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
import OrderCollection from "../../services/OrderCollectionService";

export interface Order {
  id: string;
  user: string;
  status: string;
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
              <Typography variant="h6" textAlign="center">
                Order ID: {order.id}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Status:</Typography>
              <Typography variant="body1">{order.status}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>User:</Typography>
              <Typography variant="body1">{order.user}</Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "1rem" }}
            onClick={handleOpen}
          >
            Update Status
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogContent>
              <RadioGroup value={selectedStatus} onChange={handleStatusChange}>
                <FormControlLabel
                  value="Pending"
                  control={<Radio />}
                  label="Pending"
                />
                <FormControlLabel
                  value="Delivered"
                  control={<Radio />}
                  label="Delivered"
                />
                <FormControlLabel
                  value="Processing"
                  control={<Radio />}
                  label="Processing"
                />
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleStatusUpdate} color="primary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </StyledCardContainer>
      </StyledCard>
    </div>
  );
}
