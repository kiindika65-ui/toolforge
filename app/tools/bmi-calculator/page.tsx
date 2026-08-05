"use client";

import { useState } from "react";

export default function BMICalculator() {

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");


  function calculateBMI() {

    const weightValue = Number(weight);
    const heightValue = Number(height) / 100;


    if (!weightValue || !heightValue) return;


    const result =
      weightValue / (heightValue * heightValue);


    setBmi(Number(result.toFixed(2)));


    if (result < 18.5) {
      setCategory("Underweight");
    } 
    else if (result < 25) {
      setCategory("Normal weight");
    } 
    else if (result < 30) {
      setCategory("Overweight");
    } 
    else {
      setCategory("Obese");
    }

  }


  return (

    <main className="min-h-screen bg-gray-50 px-6 py-20">


      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">


        <h1 className="text-center text-4xl font-bold">
          BMI Calculator
        </h1>


        <p className="mt-4 text-center text-gray-600">
          Calculate your Body Mass Index easily.
        </p>



        <div className="mt-8 space-y-5">


          <div>
            <label className="font-semibold">
              Weight (kg)
            </label>

            <input
              type="number"
              placeholder="Example: 70"
              value={weight}
              onChange={(e)=>setWeight(e.target.value)}
              className="mt-2 w-full rounded-xl border p-3"
            />

          </div>



          <div>

            <label className="font-semibold">
              Height (cm)
            </label>


            <input
              type="number"
              placeholder="Example: 175"
              value={height}
              onChange={(e)=>setHeight(e.target.value)}
              className="mt-2 w-full rounded-xl border p-3"
            />

          </div>



          <button
            onClick={calculateBMI}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Calculate BMI
          </button>


        </div>




        {bmi && (

          <div className="mt-8 rounded-xl bg-gray-100 p-6 text-center">


            <h2 className="text-3xl font-bold">
              {bmi}
            </h2>


            <p className="mt-2 text-lg">
              {category}
            </p>


          </div>

        )}



      </div>


    </main>

  );

}