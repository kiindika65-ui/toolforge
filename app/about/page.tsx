export default function AboutPage() {

  return (

    <main className="min-h-screen bg-gray-50 px-6 py-20">


      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 shadow-lg">


        <h1 className="text-center text-5xl font-bold text-gray-900">
          About ToolForge
        </h1>



        <p className="mt-8 text-lg leading-8 text-gray-600">
          ToolForge is a free online tools platform created to make
          everyday digital tasks easier, faster, and more accessible.
        </p>



        <p className="mt-6 text-lg leading-8 text-gray-600">
          Our goal is to provide simple, powerful, and easy-to-use tools
          for students, developers, creators, businesses, and everyone
          who needs useful online utilities.
        </p>



        <div className="mt-10 grid gap-6 md:grid-cols-3">


          <div className="rounded-xl bg-gray-100 p-6 text-center">

            <div className="text-4xl">
              🚀
            </div>

            <h2 className="mt-3 font-bold">
              Fast
            </h2>

            <p className="mt-2 text-gray-600">
              Quick tools with simple interfaces.
            </p>

          </div>



          <div className="rounded-xl bg-gray-100 p-6 text-center">

            <div className="text-4xl">
              🔒
            </div>

            <h2 className="mt-3 font-bold">
              Secure
            </h2>

            <p className="mt-2 text-gray-600">
              Your data stays private.
            </p>

          </div>



          <div className="rounded-xl bg-gray-100 p-6 text-center">

            <div className="text-4xl">
              💡
            </div>

            <h2 className="mt-3 font-bold">
              Simple
            </h2>

            <p className="mt-2 text-gray-600">
              Easy tools for everyone.
            </p>

          </div>


        </div>


      </div>


    </main>

  );

}