"use client";

import { useState } from "react";

export default function WordCounter() {

  const [text, setText] = useState("");


  const words =
    text.trim() === ""
      ? 0
      : text.trim().split(/\s+/).length;


  const characters = text.length;


  const charactersNoSpaces =
    text.replace(/\s/g, "").length;


  const sentences =
    text.trim() === ""
      ? 0
      : text.split(/[.!?]+/).filter(Boolean).length;



  return (

    <main className="min-h-screen bg-gray-50 px-6 py-20">


      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">


        <h1 className="text-center text-4xl font-bold">
          Word Counter
        </h1>


        <p className="mt-4 text-center text-gray-600">
          Count words, characters, and sentences instantly.
        </p>



        <textarea

          value={text}

          onChange={(e)=>setText(e.target.value)}

          placeholder="Start typing or paste your text here..."

          className="mt-8 h-64 w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"

        />




        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">


          <div className="rounded-xl bg-gray-100 p-5 text-center">

            <h2 className="text-3xl font-bold">
              {words}
            </h2>

            <p>
              Words
            </p>

          </div>



          <div className="rounded-xl bg-gray-100 p-5 text-center">

            <h2 className="text-3xl font-bold">
              {characters}
            </h2>

            <p>
              Characters
            </p>

          </div>




          <div className="rounded-xl bg-gray-100 p-5 text-center">

            <h2 className="text-3xl font-bold">
              {charactersNoSpaces}
            </h2>

            <p>
              No Spaces
            </p>

          </div>




          <div className="rounded-xl bg-gray-100 p-5 text-center">

            <h2 className="text-3xl font-bold">
              {sentences}
            </h2>

            <p>
              Sentences
            </p>

          </div>


        </div>


      </div>


    </main>

  );

}