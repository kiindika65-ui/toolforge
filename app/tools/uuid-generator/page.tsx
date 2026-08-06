"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";
import ClearButton from "@/components/ClearButton";

export default function UUIDGeneratorPage() {
  const [uuid, setUuid] = useState("");
  const [count, setCount] = useState(1);

  function generateUUID() {
    const uuids = Array.from({ length: count }, () =>
      crypto.randomUUID()
    );

    setUuid(uuids.join("\n"));
  }

  function clearUUID() {
    setUuid("");
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">

          <h1 className="text-4xl font-bold md:text-5xl">
            UUID Generator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Generate secure random UUID v4 identifiers instantly.
            Free developer tool for projects, databases and APIs.
          </p>

        </div>
      </section>


      {/* Tool */}
      <section className="mx-auto max-w-5xl px-6 py-10">

        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <label className="mb-3 block text-lg font-semibold">
            Number of UUIDs
          </label>


          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) =>
              setCount(Number(e.target.value))
            }
            className="mb-6 w-full rounded-xl border p-3 outline-none focus:border-blue-500"
          />


          <div className="flex flex-wrap gap-3">

            <button
              onClick={generateUUID}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Generate UUID
            </button>


            <ClearButton
              onClear={clearUUID}
              disabled={!uuid}
            />

          </div>


          <div className="mt-8">

            <div className="mb-3 flex items-center justify-between">

              <h2 className="text-xl font-bold">
                Generated UUID
              </h2>


              <CopyButton text={uuid} />

            </div>


            <textarea
              value={uuid}
              readOnly
              placeholder="Your UUID will appear here..."
              className="h-56 w-full rounded-xl border bg-gray-50 p-4 font-mono text-sm"
            />

          </div>

        </div>

      </section>


      {/* SEO Content */}
      <section className="mx-auto max-w-5xl px-6 pb-12">

        <div className="rounded-2xl bg-white p-8 shadow">

          <h2 className="text-2xl font-bold">
            What is a UUID?
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            UUID (Universally Unique Identifier) is a 128-bit
            identifier used to uniquely identify information
            in software applications, databases and APIs.
          </p>


          <h2 className="mt-8 text-2xl font-bold">
            Common uses of UUID
          </h2>


          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">

            <li>Database record IDs</li>
            <li>API request identifiers</li>
            <li>Software development projects</li>
            <li>Distributed systems</li>

          </ul>

        </div>

      </section>


    </main>
  );
}