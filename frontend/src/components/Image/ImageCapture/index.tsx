import { Button } from "@mui/material";
import "./styles.css";

export default function ImageCapture() {
  return (
    <div id="camera-overlay">
      <video id="camera" width="100%" height="100%" autoPlay></video>
      <Button variant="contained" id="capture-btn">
        Capture Image
      </Button>
      <canvas id="canvas"></canvas>
    </div>
  );
}
