"use client";
import { useState } from "react";
import { encodeStr } from "./_utils/text";
import { toast } from "react-toastify";
import { uploadInput } from "./actions";
import Link from "next/link";
import "regenerator-runtime/runtime";
import { Uploader } from "./_components/uploader";

const IndexPage = () => {
  const [state, setState] = useState({
    encodeRes: "",
  });

  const onEncode = (input: string, url: string) => {
    const result = encodeStr(input, url);

    setState({
      encodeRes: result,
    });

    uploadInput(input, url);
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
            <Uploader onEncode={onEncode} />
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
