import ImageKit from "imagekit";
import Image from "next/image";
import UploadForm from "@/components/UploadForm";

const IndexPage = async () => {
  const images = await getList();

  return (
    <main title="Home | Next.js + TypeScript Example">
      <h1>Imagekit Next js 👋</h1>
      {images?.map(({ fileId, name, url }) => (
        <div key={fileId}>
          <Image src={url} alt={name} width={512} height={512} />
        </div>
      ))}
      {/* <UploadForm /> */}
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
