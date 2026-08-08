"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";
import ClearButton from "@/components/ClearButton";

type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-512";

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function generateHash() {
    setError("");
    setResult("");

    if (!input) {
      setError("Please enter some text first.");
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      const hashBuffer = await crypto.subtle.digest(
        algorithm,
        data
      );

      const hashArray = Array.from(
        new Uint8Array(hashBuffer)
      );

      const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      setResult(hashHex);
    } catch {
      setError("Unable to generate the hash.");
    }
  }

  function clearAll() {
    setInput("");
    setResult("");
    setError("");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Hash Generator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Generate SHA-1, SHA-256 and SHA-512 hashes from text
            instantly using this free online developer tool.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <label
            htmlFor="hash-input"
            className="mb-3 block text-lg font-semibold"
          >
            Enter Text
          </label>

          <textarea
            id="hash-input"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setError("");
            }}
            placeholder="Enter text to hash..."
            className="h-48 w-full rounded-xl border p-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-2 text-sm text-gray-500">
            Characters: {input.length}
          </p>

          {/* Algorithm */}
          <div className="mt-6">
            <label
              htmlFor="hash-algorithm"
              className="mb-2 block font-semibold"
            >
              Hash Algorithm
            </label>

            <select
              id="hash-algorithm"
              value={algorithm}
              onChange={(event) =>
                setAlgorithm(
                  event.target.value as HashAlgorithm
                )
              }
              className="w-full rounded-xl border p-3 outline-none focus:border-blue-500 md:w-72"
            >
              <option value="SHA-1">SHA-1</option>
              <option value="SHA-256">SHA-256</option>
              <option value="SHA-512">SHA-512</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={generateHash}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              🔐 Generate Hash
            </button>

            <ClearButton
              onClear={clearAll}
              disabled={!input && !result}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-lg bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Result */}
          <div className="mt-8">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">
                  Hash Result
                </h2>

                <p className="text-sm text-gray-500">
                  {algorithm}
                </p>
              </div>

              <CopyButton text={result} />
            </div>

            <textarea
              value={result}
              readOnly
              placeholder="Your hash will appear here..."
              className="min-h-32 w-full rounded-xl border bg-gray-50 p-4 font-mono text-sm break-all"
            />
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="mx-auto max-w-5xl px-6 pb-12">
        <div className="rounded-2xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold">
            What is a Hash?
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            A hash is a fixed-length value created from input
            data using a hash function. Hashes are commonly used
            for data integrity, digital signatures, file
            verification and many other software applications.
          </p>

          <h2 className="mt-8 text-2xl font-bold">
            Supported Hash Algorithms
          </h2>

          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold">SHA-1</h3>
              <p className="text-gray-700">
                Produces a 160-bit hash. SHA-1 is considered
                cryptographically weak for security-sensitive
                applications and should generally not be used
                for new security designs.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">SHA-256</h3>
              <p className="text-gray-700">
                Produces a 256-bit hash and is widely used for
                integrity checks, certificates and modern
                cryptographic applications.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">SHA-512</h3>
              <p className="text-gray-700">
                Produces a 512-bit hash and is part of the
                SHA-2 family of cryptographic hash functions.
              </p>
            </div>
          </div>

          <h2 className="mt-8 text-2xl font-bold">
            Is this tool secure?
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            Hashing is performed directly in your browser using
            the Web Crypto API. The tool does not need to send
            the entered text to a server.
          </p>
        </div>
      </section>
    </main>
  );
}