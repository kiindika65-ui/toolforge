"use client";

import { useState } from "react";


export default function ContactPage() {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");



  function submitForm(e: React.FormEvent) {

    e.preventDefault();

    alert("Thanks for contacting ToolForge!");

    setName("");
    setEmail("");
    setMessage("");

  }



  return (

    <main className="min-h-screen bg-gray-50 px-6 py-20">


      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">


        <h1 className="text-center text-5xl font-bold">
          Contact ToolForge
        </h1>


        <p className="mt-4 text-center text-gray-600">
          Have questions or suggestions? Send us a message.
        </p>



        <form
          onSubmit={submitForm}
          className="mt-8 space-y-5"
        >


          <input

            type="text"

            placeholder="Your Name"

            value={name}

            onChange={(e)=>setName(e.target.value)}

            className="w-full rounded-xl border p-4"

          />



          <input

            type="email"

            placeholder="Your Email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            className="w-full rounded-xl border p-4"

          />



          <textarea

            placeholder="Your Message"

            value={message}

            onChange={(e)=>setMessage(e.target.value)}

            className="h-40 w-full rounded-xl border p-4"

          />



          <button

            type="submit"

            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"

          >

            Send Message

          </button>



        </form>


      </div>


    </main>

  );

}