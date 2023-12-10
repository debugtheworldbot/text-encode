"use client";
import { useRef, useState } from "react";
import UploadForm from "./_components/uploadForm";
import { decodeStr, encodeStr } from "./_utils/text";
import Image from "next/image";
import { toast } from "react-toastify";

const IndexPage = () => {
  const [state, setState] = useState({
    encodeRes: "",
    decodeRes: "",
  });

  const eRef = useRef<any>(null);
  const dRef = useRef<any>(null);

  const onUploaded = (url: string) => {
    toast("upload success");
    const input = eRef.current?.value;
    const result = encodeStr(input, url);

    setState({
      ...state,
      encodeRes: result,
    });
    toast("encode success!");
  };
  const validateInput = () => {
    const input = eRef.current?.value;
    if (!input) {
      toast.error("no input");
      return false;
    }
    return true;
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
    <main className="min-h-screen flex flex-col">
      <h1 className="text-center text-3xl my-8">Encode your image into text</h1>

      <div className="flex gap-4 justify-center items-center">
        <div className="shadow-xl p-6 rounded">
          <label className="label">
            endcode text:
            <input ref={eRef} className="input ml-4" />
          </label>
          <div className="my-4">
            <UploadForm validate={validateInput} onSuccess={onUploaded} />
          </div>

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
      </div>
    </main>
  );
};

export default IndexPage;
