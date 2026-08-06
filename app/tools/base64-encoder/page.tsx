"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";
import ClearButton from "@/components/ClearButton";

export default function Base64EncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function encodeBase64() {
    try {
      setError("");

      if (!input.trim()) {
        setOutput("");
        return;
      }

      const encoded = btoa(
        encodeURIComponent(input).replace(
          /%([0-9A-F]{2})/g,
          (_, p1) =>
            String.fromCharCode(parseInt(p1, 16))
        )
      );

      setOutput(encoded);
    } catch {
      setError("Unable to encode text.");
    }
  }

  function decodeBase64() {
    try {
      setError("");

      if (!input.trim()) {
        setOutput("");
        return;
      }

      const decoded = decodeURIComponent(
        Array.prototype.map
          .call(atob(input), (char: string) =>
            "%" +
            ("00" + char.charCodeAt(0).toString(16))
              .slice(-2)
          )
          .join("")
      );

      setOutput(decoded);
    } catch {
      setError("Invalid Base64 input.");
    }
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">

          <h1 className="text-4xl font-bold md:text-5xl">
            Base64 Encoder & Decoder
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Encode text into Base64 or decode Base64 back into readable text instantly.
          </p>

        </div>
      </section>


      {/* Tool */}
      <section className="mx-auto max-w-5xl px-6 py-10">

        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <label className="mb-3 block text-lg font-semibold">
            Enter Text / Base64
          </label>


          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste your text here..."
            className="h-48 w-full rounded-xl border p-4 outline-none focus:border-blue-500"
          />


          <p className="mt-2 text-sm text-gray-500">
            Characters: {input.length}
          </p>


          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={encodeBase64}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Encode
            </button>


            <button
              onClick={decodeBase64}
              className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
            >
              Decode
            </button>


            <ClearButton
              onClear={clearAll}
              disabled={!input && !output}
            />

          </div>


          {error && (
            <div className="mt-5 rounded-lg bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}


          <div className="mt-8">

            <div className="mb-3 flex items-center justify-between">

              <h2 className="text-xl font-bold">
                Result
              </h2>


              <CopyButton text={output} />

            </div>


            <textarea
              value={output}
              readOnly
              placeholder="Your result will appear here..."
              className="h-48 w-full rounded-xl border bg-gray-50 p-4"
            />

          </div>


        </div>

      </section>


      {/* SEO Content */}
      <section className="mx-auto max-w-5xl px-6 pb-12">

        <div className="rounded-2xl bg-white p-8 shadow">

          <h2 className="text-2xl font-bold">
            What is Base64 Encoder?
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            Base64 is an encoding method used to convert text and binary data
            into a readable ASCII format. Developers commonly use Base64 for
            APIs, data transfer, images, and authentication systems.
          </p>


          <h2 className="mt-8 text-2xl font-bold">
            How to use this tool?
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
            <li>Enter your text or Base64 data.</li>
            <li>Click Encode or Decode.</li>
            <li>Copy the generated result.</li>
          </ul>

        </div>

      </section>


    </main>
  );
}