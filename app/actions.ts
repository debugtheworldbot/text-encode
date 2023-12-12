"use server";
import ImageKit from "imagekit";
import { sql } from "@vercel/postgres";

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
      const url = result.url;
      return { url, status: "ok" };
    }
  } catch (err) {
    return { url: "", status: "error" };
  }
}

export async function uploadInput(input: string, imgUrl: string) {
  try {
    await sql`INSERT INTO Inputs (Input, ImgUrl) VALUES (${input}, ${imgUrl});`;
    const result = await sql`SELECT * FROM Inputs;`;
    console.log(result);
    return "ok";
  } catch (error) {
    console.log(error);
    return "error";
  }
}
