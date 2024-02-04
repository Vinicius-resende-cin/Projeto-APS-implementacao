import ImageCollection from "../services/ImageCollectionService";

export default class ImagePresenter {
  public static openCamera(): void {
    const cameraOverlay = document.getElementById("camera-overlay") as HTMLDivElement;
    cameraOverlay.style.display = "block";

    let videoStream: MediaStream;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = document.getElementById("camera") as HTMLVideoElement;
        videoStream = stream;
        video.srcObject = stream;
      })
      .catch((error) => console.error("Error accessing camera:", error));

    const captureBtn = document.getElementById("capture-btn") as HTMLButtonElement;
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const capturedImage = document.getElementById("captured-image") as HTMLImageElement;

    captureBtn.addEventListener("click", () => {
      const video = document.getElementById("camera") as HTMLVideoElement;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (context === null) throw Error("Couldn't process the picture");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      cameraOverlay.style.display = "none";

      const imageDataUrl = canvas.toDataURL("image/png");
      capturedImage.src = imageDataUrl;

      // canvas.toBlob((blob) => {
      //   if (blob === null) throw Error("Couldn't process the picture");
      //   ImageCollection.addImage(blob);
      // });

      videoStream.getTracks().forEach((track) => track.stop());
    });
  }
}
