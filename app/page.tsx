"use client";
import { useRef, useState } from "react";
import UploadForm from "./_components/uploadForm";
import { encodeStr } from "./_utils/text";
import { toast } from "react-toastify";
import { uploadInput } from "./actions";
import Link from "next/link";

const IndexPage = () => {
  const [state, setState] = useState({
    encodeRes: "",
  });

  const eRef = useRef<any>(null);

  const onUploaded = (url: string) => {
    const input = eRef.current?.value;
    const result = encodeStr(input, url);

    setState({
      encodeRes: result,
    });

    uploadInput(input, url);
  };
  const validateInput = () => {
    const input = eRef.current?.value;
    if (!input) {
      toast.error("please fill the input");
      return false;
    }
    return true;
  };

  return (
    <main className="min-h-screen flex flex-col justify-center">
      <div className="flex justify-center items-center">
        <div className="p-2 rounded-3xl bg-white/5 backdrop-blur border border-white/30 min-w-[50vw]">
          {state.encodeRes ? (
            <>
              <div
                className="link link-info cursor-pointer text-center py-12 text-2xl"
                onClick={() => {
                  navigator.clipboard.writeText(state.encodeRes);
                  toast("copied");
                }}
              >
                {state.encodeRes}
              </div>
            </>
          ) : (
            <>
              <input
                placeholder="text to be encoded"
                ref={eRef}
                className="px-3 py-3 w-full bg-transparent border border-white/10 rounded-2xl text-white/60 text-center"
              />
              <UploadForm validate={validateInput} onSuccess={onUploaded} />
            </>
          )}
        </div>
      </div>
      <Link href="/decode" className="btn btn-ghost w-fit mx-auto mt-4">
        decode text
      </Link>
    </main>
  );
};

export default IndexPage;
