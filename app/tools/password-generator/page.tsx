"use client";

import { useState } from "react";

export default function PasswordGenerator() {

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);

  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);


  function generatePassword() {

    let characters = "";

    if (uppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) characters += "0123456789";
    if (symbols) characters += "!@#$%^&*()_+";


    let result = "";


    for (let i = 0; i < length; i++) {

      const random =
        Math.floor(Math.random() * characters.length);

      result += characters[random];

    }


    setPassword(result);

  }



  function copyPassword() {

    navigator.clipboard.writeText(password);

  }



  return (

    <main className="min-h-screen bg-gray-50 px-6 py-20">


      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">


        <h1 className="text-center text-4xl font-bold">
          Password Generator
        </h1>


        <p className="mt-4 text-center text-gray-600">
          Create strong and secure passwords instantly.
        </p>



        <div className="mt-8">


          <input
            value={password}
            readOnly
            placeholder="Your password"
            className="w-full rounded-xl border p-4 text-center text-xl"
          />


          <button
            onClick={copyPassword}
            className="mt-3 w-full rounded-xl bg-gray-800 py-3 text-white hover:bg-gray-900"
          >
            Copy Password
          </button>


        </div>




        <div className="mt-8">


          <label className="font-semibold">
            Password Length: {length}
          </label>


          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e)=>setLength(Number(e.target.value))}
            className="mt-3 w-full"
          />


        </div>




        <div className="mt-6 space-y-3">


          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e)=>setUppercase(e.target.checked)}
            />
            Uppercase Letters
          </label>



          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e)=>setLowercase(e.target.checked)}
            />
            Lowercase Letters
          </label>



          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={numbers}
              onChange={(e)=>setNumbers(e.target.checked)}
            />
            Numbers
          </label>



          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={symbols}
              onChange={(e)=>setSymbols(e.target.checked)}
            />
            Symbols
          </label>


        </div>



        <button
          onClick={generatePassword}
          className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Generate Password
        </button>


      </div>


    </main>

  );

}