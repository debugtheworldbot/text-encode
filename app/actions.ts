"use server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_API_KEY || "",
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT || "",
});
export async function uploadImg(file: string) {
  try {
    const result = await imagekit.upload({
      file,
      fileName: "test.jpg",
    });
    if (result) {
      const url = imagekit.url({
        src: result.url,
        transformation: [
          {
            height: "1024",
            width: "1024",
          },
        ],
      });
      return { url, status: "ok" };
    }
  } catch (err) {
    return { url: "", status: "error" };
  }
}
