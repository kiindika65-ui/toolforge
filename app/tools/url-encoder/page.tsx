"use client";

import { useState } from "react";

export default function URLEncoder() {

  const [text, setText] = useState("");
  const [result, setResult] = useState("");


  function encodeURL() {

    setResult(
      encodeURIComponent(text)
    );

  }



  function decodeURL() {

    try {

      setResult(
        decodeURIComponent(text)
      );

    } catch {

      setResult("Invalid encoded text");

    }

  }



  function copyResult() {

    navigator.clipboard.writeText(result);

  }



  return (

    <main className="min-h-screen bg-gray-50 px-6 py-20">

      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">


        <h1 className="text-center text-4xl font-bold">
          URL Encoder / Decoder
        </h1>


        <p className="mt-4 text-center text-gray-600">
          Encode and decode URL text instantly.
        </p>



        <textarea

          value={text}

          onChange={(e)=>setText(e.target.value)}

          placeholder="Enter URL text..."

          className="mt-8 h-48 w-full rounded-xl border p-4"

        />



        <div className="mt-6 grid gap-4 md:grid-cols-3">


          <button
            onClick={encodeURL}
            className="rounded-xl bg-blue-600 py-3 text-white"
          >
            Encode
          </button>



          <button
            onClick={decodeURL}
            className="rounded-xl bg-purple-600 py-3 text-white"
          >
            Decode
          </button>



          <button
            onClick={copyResult}
            className="rounded-xl bg-gray-900 py-3 text-white"
          >
            Copy
          </button>


        </div>



        <div className="mt-8 rounded-xl bg-gray-100 p-5">

          <h2 className="font-bold">
            Result
          </h2>

          <p className="mt-3 break-all">
            {result}
          </p>

        </div>


      </div>


    </main>

  );

}