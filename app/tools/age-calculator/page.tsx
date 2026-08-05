"use client";

import { useState } from "react";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);


  function calculateAge() {
    if (!birthDate) return;


    const birth = new Date(birthDate);
    const today = new Date();


    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();


    if (days < 0) {
      months--;
      days += new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
    }


    if (months < 0) {
      years--;
      months += 12;
    }


    setAge({
      years,
      months,
      days,
    });
  }


  return (
    <main className="min-h-screen bg-gray-50 px-6 py-20">

      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">


        <h1 className="text-center text-4xl font-bold text-gray-900">
          Age Calculator
        </h1>


        <p className="mt-4 text-center text-gray-600">
          Calculate your exact age in years, months, and days.
        </p>


        <div className="mt-8">

          <label className="font-semibold">
            Enter your birth date
          </label>


          <input
            type="date"
            value={birthDate}
            onChange={(e)=>setBirthDate(e.target.value)}
            className="mt-2 w-full rounded-xl border p-3"
          />


          <button
            onClick={calculateAge}
            className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Calculate Age
          </button>

        </div>



        {age && (

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">


            <div className="rounded-xl bg-gray-100 p-4">
              <div className="text-3xl font-bold">
                {age.years}
              </div>
              <div>
                Years
              </div>
            </div>


            <div className="rounded-xl bg-gray-100 p-4">
              <div className="text-3xl font-bold">
                {age.months}
              </div>
              <div>
                Months
              </div>
            </div>


            <div className="rounded-xl bg-gray-100 p-4">
              <div className="text-3xl font-bold">
                {age.days}
              </div>
              <div>
                Days
              </div>
            </div>


          </div>

        )}


      </div>

    </main>
  );
}