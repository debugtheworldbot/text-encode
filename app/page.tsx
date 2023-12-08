"use client";
import { useRef, useState } from "react";
import UploadForm from "./_components/uploadForm";
import { decodeStr, encodeStr } from "./_utils/text";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IndexPage = () => {
  const [state, setState] = useState({
    encodeRes: "",
    decodeRes: "",
  });

  const [imgUrl, setImgUrl] = useState("");

  const eRef = useRef<any>(null);
  const dRef = useRef<any>(null);

  const onUploaded = (url: string) => {
    toast("upload success");
    setImgUrl(url);
  };
  const clickEncode = () => {
    const input = eRef.current?.value;
    if (!input) return toast.error("no input");
    if (!imgUrl) return toast.error("no img url,plz upload one");
    const result = encodeStr(input, imgUrl);

    setState({
      ...state,
      encodeRes: result,
    });
    toast("encode success!");
  };

  const clickDecode = () => {
    const input = dRef.current?.value;
    if (!input) return toast.error("no input");
    const result = decodeStr(input);
    if (!result) return toast.error("no hidden image");
    setState({
      ...state,
      decodeRes: result,
    });
    toast("decode success!");
  };
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="border border-solid border-red-300 p-4">
        <label>
          endcode text:
          <input ref={eRef} />
        </label>
        <div className="my-4">
          <UploadForm onSuccess={onUploaded} />
        </div>

        <button className="" onClick={clickEncode}>
          encode img into text
        </button>

        <div>result:</div>
        <div
          className="cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-2 rounded"
          onClick={() => {
            navigator.clipboard.writeText(state.encodeRes);
          }}
        >
          {state.encodeRes}
        </div>
      </div>

      <div className="border border-solid border-red-300 p-4 mt-6">
        <label>
          decode text:
          <input ref={dRef} />
        </label>
        <button className="block" onClick={clickDecode}>
          decode text
        </button>
        {state.decodeRes && (
          <div>
            <Image
              width={200}
              height={200}
              src={state.decodeRes}
              alt="result"
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default IndexPage;
