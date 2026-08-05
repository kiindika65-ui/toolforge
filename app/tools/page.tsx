import Link from "next/link";
import { tools } from "@/data/tools";


export default function ToolsPage() {


  const categories = [
    "Calculators",
    "Text Tools",
    "Developer Tools",
    "Generators",
    "Converters",
    "Health",
    "Security",
  ];



  return (

    <main className="min-h-screen bg-gray-50 px-6 py-20">


      <div className="mx-auto max-w-7xl">


        <h1 className="text-center text-5xl font-bold">
          All Tools
        </h1>


        <p className="mt-4 text-center text-gray-600">
          Browse all free online tools from ToolForge.
        </p>



        {categories.map((category)=>(


          <section
            key={category}
            className="mt-12"
          >


            <h2 className="mb-6 text-3xl font-bold">
              {category}
            </h2>



            <div className="grid gap-6 md:grid-cols-3">


              {tools
                .filter(
                  tool =>
                  tool.category === category
                )
                .map(tool=>(


                <Link
                  key={tool.title}
                  href={tool.link}
                >

                  <div className="rounded-2xl bg-white p-6 shadow hover:-translate-y-2 hover:shadow-xl">


                    <div className="text-5xl">
                      {tool.icon}
                    </div>


                    <h3 className="mt-4 text-xl font-bold">
                      {tool.title}
                    </h3>


                    <p className="mt-2 text-gray-600">
                      {tool.description}
                    </p>


                  </div>


                </Link>


              ))}


            </div>


          </section>


        ))}



      </div>


    </main>

  );

}