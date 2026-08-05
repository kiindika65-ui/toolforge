import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";


export default function Home() {

  return (

    <>
      <Navbar />

      <Hero />


      <section className="bg-gray-50 py-20">

        <div className="mx-auto max-w-7xl px-6">


          <h2 className="mb-10 text-center text-4xl font-bold">
            Featured Tools
          </h2>


          <div className="grid gap-6 md:grid-cols-3">


            {tools.map((tool)=>(
              
              <ToolCard
                key={tool.title}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                link={tool.link}
              />

            ))}


          </div>


        </div>

      </section>


      <Footer />

    </>

  );

}