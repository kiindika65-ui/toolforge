"use client";

import { useState } from "react";
import Link from "next/link";
import { tools } from "@/data/tools";


export default function ToolSearch() {

  const [search, setSearch] = useState("");


  const filteredTools = tools.filter((tool) =>
    tool.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (

    <section className="bg-white py-12">

      <div className="mx-auto max-w-5xl px-6">


        <h2 className="mb-6 text-center text-3xl font-bold">
          🔍 Find Your Tool
        </h2>



        <input

          type="text"

          placeholder="Search tools..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="w-full rounded-xl border p-4 shadow"

        />




        {search && (

          <div className="mt-6 grid gap-4 md:grid-cols-3">


            {filteredTools.map((tool)=>(

              <Link
                key={tool.title}
                href={tool.link}
              >

                <div className="rounded-xl bg-gray-100 p-5 hover:shadow-lg">


                  <div className="text-3xl">
                    {tool.icon}
                  </div>


                  <h3 className="mt-3 font-bold">
                    {tool.title}
                  </h3>


                  <p className="text-sm text-gray-600">
                    {tool.description}
                  </p>


                </div>

              </Link>

            ))}


          </div>

        )}



      </div>


    </section>

  );

}