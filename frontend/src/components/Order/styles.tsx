import { Card, styled } from "@mui/material";

export const StyledCard = styled(Card)({
  width: "18rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const StyledCardContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  margin: "1rem",
});
