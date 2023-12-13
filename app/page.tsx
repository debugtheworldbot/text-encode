"use client";
import { useRef, useState } from "react";
import UploadForm from "./_components/uploadForm";
import { decodeStr, encodeStr } from "./_utils/text";
import Image from "next/image";
import { toast } from "react-toastify";
import { uploadInput } from "./actions";

const IndexPage = () => {
  const [state, setState] = useState({
    encodeRes: "",
    decodeRes: "",
  });

  const eRef = useRef<any>(null);
  const dRef = useRef<any>(null);

  const onUploaded = (url: string) => {
    const input = eRef.current?.value;
    const result = encodeStr(input, url);

    setState({
      ...state,
      encodeRes: result,
    });

    uploadInput(input, url);
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

  const clickDecode = async () => {
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
    <main className="min-h-screen flex flex-col justify-center">
      <div className="flex gap-4 justify-center items-center">
        <div className="shadow-xl p-2 rounded-3xl bg-white/5 backdrop-blur border border-white/30 min-w-[50vw]">
          <input
            placeholder="输入最终显示的文字"
            ref={eRef}
            className="px-3 py-3 w-full bg-transparent border border-white/10 rounded-2xl text-white/60 text-center"
          />
          <UploadForm validate={validateInput} onSuccess={onUploaded} />
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

        {/* <div className="shadow-xl p-6 rounded"> */}
        {/*   <label className="label"> */}
        {/*     decode text: */}
        {/*     <input ref={dRef} className="input ml-4" /> */}
        {/*   </label> */}
        {/*   <button className="block btn btn-primary" onClick={clickDecode}> */}
        {/*     decode image: */}
        {/*   </button> */}
        {/*   {state.decodeRes && ( */}
        {/*     <div> */}
        {/*       <Image */}
        {/*         width={600} */}
        {/*         height={600} */}
        {/*         src={state.decodeRes} */}
        {/*         alt="result" */}
        {/*       /> */}
        {/*     </div> */}
        {/*   )} */}
        {/* </div> */}
      </div>
    </main>
  );
};

export default IndexPage;
