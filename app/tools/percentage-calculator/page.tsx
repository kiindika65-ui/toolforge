"use client";

import { useState } from "react";

export default function PercentageCalculator() {

  const [percentage, setPercentage] = useState("");
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");



  function calculate() {

    const p = Number(percentage);
    const n = Number(number);


    if (!p || !n) return;


    const answer = (p / 100) * n;


    setResult(answer.toFixed(2));

  }



  function increase() {

    const p = Number(percentage);
    const n = Number(number);


    if (!p || !n) return;


    const answer =
      n + (p / 100) * n;


    setResult(answer.toFixed(2));

  }



  function decrease() {

    const p = Number(percentage);
    const n = Number(number);


    if (!p || !n) return;


    const answer =
      n - (p / 100) * n;


    setResult(answer.toFixed(2));

  }



  return (

    <main className="min-h-screen bg-gray-50 px-6 py-20">


      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">


        <h1 className="text-center text-4xl font-bold">
          Percentage Calculator
        </h1>


        <p className="mt-4 text-center text-gray-600">
          Calculate percentages quickly and easily.
        </p>




        <div className="mt-8 space-y-4">


          <input

            type="number"

            placeholder="Percentage (%)"

            value={percentage}

            onChange={(e)=>setPercentage(e.target.value)}

            className="w-full rounded-xl border p-4"

          />



          <input

            type="number"

            placeholder="Number"

            value={number}

            onChange={(e)=>setNumber(e.target.value)}

            className="w-full rounded-xl border p-4"

          />


        </div>




        <div className="mt-6 grid gap-3">


          <button

            onClick={calculate}

            className="rounded-xl bg-blue-600 py-3 text-white"

          >
            Find Percentage
          </button>



          <button

            onClick={increase}

            className="rounded-xl bg-green-600 py-3 text-white"

          >
            Increase By Percentage
          </button>



          <button

            onClick={decrease}

            className="rounded-xl bg-red-600 py-3 text-white"

          >
            Decrease By Percentage
          </button>


        </div>




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