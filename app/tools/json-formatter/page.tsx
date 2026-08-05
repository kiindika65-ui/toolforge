"use client";

import { useState } from "react";

export default function JSONFormatter() {

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");


  function formatJSON() {

    try {

      const parsed = JSON.parse(input);

      const formatted =
        JSON.stringify(parsed, null, 2);

      setOutput(formatted);
      setError("");

    } catch {

      setError("Invalid JSON format");
      setOutput("");

    }

  }



  function minifyJSON() {

    try {

      const parsed = JSON.parse(input);

      const minified =
        JSON.stringify(parsed);

      setOutput(minified);
      setError("");

    } catch {

      setError("Invalid JSON format");
      setOutput("");

    }

  }



  function copyJSON() {

    navigator.clipboard.writeText(output);

  }



  return (

    <main className="min-h-screen bg-gray-50 px-6 py-20">

      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-lg">


        <h1 className="text-center text-4xl font-bold">
          JSON Formatter
        </h1>


        <p className="mt-4 text-center text-gray-600">
          Format, validate and minify JSON data easily.
        </p>



        <div className="mt-8 grid gap-6 md:grid-cols-2">


          <textarea

            value={input}

            onChange={(e)=>setInput(e.target.value)}

            placeholder='Paste JSON here...'

            className="h-96 rounded-xl border p-4 font-mono"

          />



          <textarea

            value={output}

            readOnly

            placeholder="Formatted result..."

            className="h-96 rounded-xl border bg-gray-50 p-4 font-mono"

          />


        </div>



        {error && (

          <p className="mt-4 text-center text-red-600">
            {error}
          </p>

        )}



        <div className="mt-6 grid gap-4 md:grid-cols-3">


          <button

            onClick={formatJSON}

            className="rounded-xl bg-blue-600 py-3 text-white"

          >
            Format JSON
          </button>



          <button

            onClick={minifyJSON}

            className="rounded-xl bg-purple-600 py-3 text-white"

          >
            Minify JSON
          </button>



          <button

            onClick={copyJSON}

            className="rounded-xl bg-gray-900 py-3 text-white"

          >
            Copy Result
          </button>


        </div>


      </div>


    </main>

  );

}