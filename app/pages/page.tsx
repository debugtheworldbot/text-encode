import ImageKit from "imagekit";
import Image from "next/image";
import UploadForm from "../_components/uploadForm";

const IndexPage = async () => {
  const images = await getList();

  return (
    <main className="min-h-screen">
      <h1>Imagekit Next js 👋</h1>
      <UploadForm />
    </main>
  );
};

const getList = async () => {
  const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_API_KEY || "",
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT || "",
  });
  const images = await imagekit.listFiles({
    limit: 5,
  });
  return images;
};

export default IndexPage;
