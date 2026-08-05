"use client";

import { useState } from "react";


export default function PasswordGenerator() {

  const [password, setPassword] = useState("");

  const [length, setLength] = useState(12);

  const [copied, setCopied] = useState(false);



  function generatePassword() {

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";


    let result = "";


    for (let i = 0; i < length; i++) {

      const randomIndex =
        Math.floor(Math.random() * characters.length);


      result += characters[randomIndex];

    }


    setPassword(result);
    setCopied(false);

  }



  function copyPassword() {

    if (!password) return;


    navigator.clipboard.writeText(password);

    setCopied(true);

  }



  return (

    <main className="min-h-screen bg-gray-50 px-6 py-20">

      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">


        <h1 className="text-center text-4xl font-bold">
          🔐 Password Generator
        </h1>


        <p className="mt-4 text-center text-gray-600">
          Create strong and secure passwords instantly.
        </p>



        <div className="mt-8">

          <label className="font-semibold">
            Password Length: {length}
          </label>


          <input

            type="range"

            min="6"

            max="32"

            value={length}

            onChange={(e) =>
              setLength(Number(e.target.value))
            }

            className="mt-3 w-full"

          />

        </div>



        <button

          onClick={generatePassword}

          className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"

        >
          Generate Password
        </button>




        {password && (

          <div className="mt-8 rounded-xl bg-gray-100 p-5">


            <p className="break-all text-center text-xl font-bold">
              {password}
            </p>



            <button

              onClick={copyPassword}

              className="mt-5 w-full rounded-xl bg-gray-900 py-3 text-white"

            >
              Copy Password
            </button>



            {copied && (

              <p className="mt-3 text-center text-green-600">
                Password copied!
              </p>

            )}


          </div>

        )}


      </div>

    </main>

  );

}