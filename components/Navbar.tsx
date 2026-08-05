"use client";

import { useState } from "react";
import Link from "next/link";


export default function Navbar() {

  const [open, setOpen] = useState(false);


  return (

    <nav className="bg-white shadow">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">


        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          ToolForge
        </Link>



        <div className="hidden gap-8 md:flex">


          <Link href="/">
            Home
          </Link>


          <Link href="/tools">
            Tools
          </Link>


          <Link href="/about">
            About
          </Link>


          <Link href="/contact">
            Contact
          </Link>


        </div>



        <button

          onClick={() => setOpen(!open)}

          className="text-3xl md:hidden"

        >
          ☰
        </button>


      </div>



      {open && (

        <div className="space-y-4 border-t px-6 py-5 md:hidden">


          <Link
            href="/"
            className="block"
          >
            Home
          </Link>


          <Link
            href="/tools"
            className="block"
          >
            Tools
          </Link>


          <Link
            href="/about"
            className="block"
          >
            About
          </Link>


          <Link
            href="/contact"
            className="block"
          >
            Contact
          </Link>


        </div>

      )}


    </nav>

  );

}