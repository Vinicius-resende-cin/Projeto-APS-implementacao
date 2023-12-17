import { serverUrl } from "../config";

export default class ImageCollection {
  static async getImages() {
    const response = await fetch(`${serverUrl}/api/images`);
    return await response.json();
  }

  static async getImage(id: string) {
    const response = await fetch(`${serverUrl}/api/images?id=${id}`);
    return await response.json();
  }

  static async addImage(image: Blob) {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(`${serverUrl}/api/images`, {
      method: "POST",
      body: formData
    });

    return await response.json();
  }
}
