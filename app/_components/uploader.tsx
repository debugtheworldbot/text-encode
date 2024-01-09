import React, { useRef, useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import Image from "next/image";
import { toast } from "react-toastify";

interface Prop {
  onEncode: (input: string, url: string) => void;
}

export const Uploader = (props: Prop) => {
  const { onEncode } = props;
  const [url, setUrl] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const eRef = useRef<any>(null);
  const id = useRef<string | number>("");
  const onError = () => {
    setUploading(false);
  };

  const onSuccess = (res: any) => {
    const url = res.url;
    setUrl(url);
    setUploading(false);
    if (id.current) {
      toast.update(id.current, {
        type: "success",
        render: "encode success",
        isLoading: false,
      });
      const input = eRef.current?.value;
      console.log({ input, url });
      onEncode(input, url);
    }
  };
  const onUploadStart = () => {
    setUploading(true);
  };

  const clickEncode = () => {
    const input = eRef.current?.value;
    if (!input) return toast.error("please fill the input");
    if (!url) {
      id.current = toast.loading("encoding...");
      return;
    }
    toast.success("encode success");
    onEncode(input, url);
  };

  return (
    <div className="flex flex-col">
      <input
        placeholder="text to be encoded"
        ref={eRef}
        className="px-3 py-3 w-full bg-transparent border border-white/10 rounded-2xl text-white/60 text-center"
      />
      <IKContext
        publicKey="public_I4NzfVRcKmsofXZ8BcLFLpFrJ30="
        urlEndpoint="https://ik.imagekit.io/okr042lm5"
        transformationPosition="path"
        authenticator={async () => {
          const result = await fetch("/api", {
            method: "GET",
          }).then((r) => r.json());
          console.log({ result });
          return result;
        }}
      >
        <div className="border border-white/10 rounded-2xl mt-1 overflow-hidden">
          {!url && !preview ? (
            <label
              htmlFor="Upload"
              className="block w-full h-full text-white/50 text-center cursor-pointer py-12 "
            >
              <IKUpload
                className="hidden w-full h-full"
                id="Upload"
                type="file"
                accept="image/*"
                fileName="my-upload"
                onError={onError}
                onSuccess={onSuccess}
                onUploadStart={onUploadStart}
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
              <div className="flex items-center justify-center">
                <Image
                  src="/add.svg"
                  width={25}
                  height={25}
                  className="mr-2"
                  alt="upload"
                />
                image to be encoded
              </div>
            </label>
          ) : (
            <Image
              className="block m-auto"
              width={600}
              height={600}
              src={preview || url}
              alt="test"
            />
          )}
        </div>
      </IKContext>
      <button
        className="btn glass bg-slate-100/80 rounded-2xl mt-4 py-2"
        onClick={clickEncode}
      >
        encode
      </button>
    </div>
  );
};
