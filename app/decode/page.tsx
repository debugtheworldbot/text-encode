"use client";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { decodeStr } from "../_utils/text";
import Image from "next/image";
import Link from "next/link";

const DecodePage = () => {
  const dRef = useRef<any>(null);
  const [state, setState] = useState({
    encodeRes: "",
    decodeRes: "",
  });
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
    <main className="min-h-screen flex justify-center items-center">
      <div className="p-6 rounded w-[50vw]">
        {state.decodeRes ? (
          <div className="flex flex-col items-center">
            <div className="flex justify-center border border-white/20 rounded-2xl backdrop-blur p-2">
              <Image
                width={600}
                height={600}
                src={state.decodeRes}
                alt="result"
              />
            </div>
            <button
              onClick={() => {
                setState({ ...state, decodeRes: "" });
              }}
              className="btn mx-auto my-4"
            >
              再解密一次
            </button>

            <Link href={"/"}> 我也要加密图片</Link>
          </div>
        ) : (
          <>
            <input
              ref={dRef}
              placeholder="输入要解密的文字"
              className="px-3 py-12 w-full bg-transparent border border-white/20 rounded-2xl text-white/60 text-center backdrop-blur"
            />
            <button
              className="btn block mx-auto mt-4 px-12"
              onClick={clickDecode}
            >
              解密
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default DecodePage;
