"use client";

import { useState } from "react";

export default function UnitConverter() {

  const [value, setValue] = useState("");
  const [conversion, setConversion] = useState("m-km");
  const [result, setResult] = useState("");



  function convert() {

    const number = Number(value);

    if (!number) return;


    let answer = 0;


    switch (conversion) {

      case "m-km":
        answer = number / 1000;
        break;

      case "km-m":
        answer = number * 1000;
        break;

      case "m-ft":
        answer = number * 3.28084;
        break;

      case "kg-lb":
        answer = number * 2.20462;
        break;

      case "lb-kg":
        answer = number / 2.20462;
        break;

      case "c-f":
        answer = (number * 9) / 5 + 32;
        break;

      case "f-c":
        answer = ((number - 32) * 5) / 9;
        break;

    }


    setResult(answer.toFixed(2));

  }



  return (

    <main className="min-h-screen bg-gray-50 px-6 py-20">


      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">


        <h1 className="text-center text-4xl font-bold">
          Unit Converter
        </h1>


        <p className="mt-4 text-center text-gray-600">
          Convert length, weight and temperature instantly.
        </p>



        <input

          type="number"

          value={value}

          onChange={(e)=>setValue(e.target.value)}

          placeholder="Enter value"

          className="mt-8 w-full rounded-xl border p-4"

        />



        <select

          value={conversion}

          onChange={(e)=>setConversion(e.target.value)}

          className="mt-5 w-full rounded-xl border p-4"

        >

          <option value="m-km">
            Meter → Kilometer
          </option>

          <option value="km-m">
            Kilometer → Meter
          </option>

          <option value="m-ft">
            Meter → Feet
          </option>

          <option value="kg-lb">
            Kilogram → Pound
          </option>

          <option value="lb-kg">
            Pound → Kilogram
          </option>

          <option value="c-f">
            Celsius → Fahrenheit
          </option>

          <option value="f-c">
            Fahrenheit → Celsius
          </option>

        </select>



        <button

          onClick={convert}

          className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"

        >
          Convert

        </button>




        {result && (

          <div className="mt-8 rounded-xl bg-gray-100 p-6 text-center">

            <h2 className="text-3xl font-bold">
              {result}
            </h2>

            <p>
              Result
            </p>

          </div>

        )}


      </div>


    </main>

  );

}