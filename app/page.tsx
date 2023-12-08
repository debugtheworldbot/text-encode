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

  const dRef = useRef<any>(null);

  const clickEncode = () => {
    const result = encodeStr(
      "hihi",
      "https://ik.imagekit.io/okr042lm5/test_bKhpCiqlz.jpg?tr=h-512%2Cw-512",
    );

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
          <input />
        </label>
        <div className="my-4">
          <UploadForm />
        </div>

        <button className="" onClick={clickEncode}>
          encode img into text
        </button>

        <div>{state.encodeRes}</div>
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
