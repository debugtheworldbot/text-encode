"use client";
import { useRef, useState } from "react";
import UploadForm from "./_components/uploadForm";
import { decodeStr, encodeStr } from "./_utils/text";
import Image from "next/image";

const IndexPage = () => {
  const [state, setState] = useState({
    encodeRes: "",
    decodeRes: "",
  });

  const [imgUrl, setImgUrl] = useState("");

  const eRef = useRef<any>(null);
  const dRef = useRef<any>(null);

  const onUploaded = (url: string) => {
    setImgUrl(url);
  };
  const clickEncode = () => {
    const input = eRef.current?.value;
    if (!input) return console.log("no input");
    if (!imgUrl) return console.log("no img url");
    const result = encodeStr(input, imgUrl);

    setState({
      ...state,
      encodeRes: result,
    });
  };

  const clickDecode = () => {
    const input = dRef.current?.value;
    if (!input) return;
    const result = decodeStr(input);
    setState({
      ...state,
      decodeRes: result,
    });
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
          className="cursor-pointer"
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
