"use client";

import { useState } from "react";

export default function CaseConverter() {

  const [text, setText] = useState("");



  function uppercase() {
    setText(text.toUpperCase());
  }


  function lowercase() {
    setText(text.toLowerCase());
  }


  function titleCase() {

    const result = text
      .toLowerCase()
      .split(" ")
      .map(
        word =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");

    setText(result);

  }



  function sentenceCase() {

    const result =
      text.charAt(0).toUpperCase() +
      text.slice(1).toLowerCase();

    setText(result);

  }



  function copyText() {

    navigator.clipboard.writeText(text);

  }



  function clearText() {

    setText("");

  }



  return (

    <main className="min-h-screen bg-gray-50 px-6 py-20">


      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">


        <h1 className="text-center text-4xl font-bold">
          Case Converter
        </h1>


        <p className="mt-4 text-center text-gray-600">
          Convert text between different cases instantly.
        </p>



        <textarea

          value={text}

          onChange={(e)=>setText(e.target.value)}

          placeholder="Enter your text here..."

          className="mt-8 h-64 w-full rounded-xl border p-4"

        />



        <div className="mt-6 grid gap-3 md:grid-cols-2">


          <button
            onClick={uppercase}
            className="rounded-xl bg-blue-600 py-3 text-white"
          >
            UPPERCASE
          </button>


          <button
            onClick={lowercase}
            className="rounded-xl bg-blue-600 py-3 text-white"
          >
            lowercase
          </button>


          <button
            onClick={titleCase}
            className="rounded-xl bg-purple-600 py-3 text-white"
          >
            Title Case
          </button>


          <button
            onClick={sentenceCase}
            className="rounded-xl bg-purple-600 py-3 text-white"
          >
            Sentence Case
          </button>


        </div>



        <div className="mt-6 grid gap-3 md:grid-cols-2">


          <button
            onClick={copyText}
            className="rounded-xl bg-gray-900 py-3 text-white"
          >
            Copy Text
          </button>


          <button
            onClick={clearText}
            className="rounded-xl border py-3"
          >
            Clear
          </button>


        </div>


      </div>


    </main>

  );

}