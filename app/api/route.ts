import ImageKit from "imagekit";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const file = await request.json();
  const result = await uploadImg(file.src);

  return Response.json(result);
}
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_API_KEY || "",
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT || "",
});
async function uploadImg(file: string) {
  try {
    const result = await imagekit.upload({
      file,
      fileName: "test.jpg",
    });
    if (result) {
      const url = result.url;
      return { url, status: "ok" };
    }
  } catch (err) {
    return { url: "", status: "error" };
  }
}
