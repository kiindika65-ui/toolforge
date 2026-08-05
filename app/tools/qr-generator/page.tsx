"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRGenerator() {

  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState("");



  function generateQR() {

    if (!text) return;

    setQrValue(text);

  }



  function downloadQR() {

    const canvas =
      document.querySelector("canvas");

    if (!canvas) return;


    const url =
      canvas.toDataURL("image/png");


    const link =
      document.createElement("a");

    link.href = url;

    link.download = "toolforge-qrcode.png";

    link.click();

  }



  return (

    <main className="min-h-screen bg-gray-50 px-6 py-20">

      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">


        <h1 className="text-center text-4xl font-bold">
          QR Code Generator
        </h1>


        <p className="mt-4 text-center text-gray-600">
          Create QR codes for links, text, and information.
        </p>



        <input

          type="text"

          placeholder="Enter text or URL"

          value={text}

          onChange={(e)=>setText(e.target.value)}

          className="mt-8 w-full rounded-xl border p-4"

        />



        <button

          onClick={generateQR}

          className="mt-5 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"

        >
          Generate QR Code
        </button>



        {qrValue && (

          <div className="mt-8 flex flex-col items-center gap-5">


            <QRCodeCanvas

              value={qrValue}

              size={220}

            />



            <button

              onClick={downloadQR}

              className="rounded-xl bg-gray-900 px-6 py-3 text-white"

            >
              Download QR

            </button>


          </div>

        )}


      </div>


    </main>

  );

}