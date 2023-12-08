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
    <main className="min-h-screen flex gap-4 justify-center items-center">
      <div className="shadow-xl p-6 rounded">
        <label className="label">
          endcode text:
          <input ref={eRef} className="input ml-4" />
        </label>
        <div className="my-4">
          <UploadForm onSuccess={onUploaded} />
        </div>

        <button className="btn btn-primary" onClick={clickEncode}>
          encode img into text
        </button>

        <div>result:</div>
        <div
          className="link link-info cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(state.encodeRes);
            toast("copied");
          }}
        >
          {state.encodeRes}
        </div>
      </div>

      <div className="shadow-xl p-6 rounded">
        <label className="label">
          decode text:
          <input ref={dRef} className="input ml-4" />
        </label>
        <button className="block btn btn-primary" onClick={clickDecode}>
          decode image:
        </button>
        {state.decodeRes && (
          <div>
            <Image
              width={600}
              height={600}
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
