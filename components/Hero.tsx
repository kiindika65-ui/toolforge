export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
          🚀 100+ Free Online Tools
        </span>

        <h1 className="mt-8 text-5xl font-extrabold md:text-7xl">
          Everything You Need
          <br />
          In One Place
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100">
          Free online tools for developers, students, designers, businesses,
          and everyone else. Fast, secure, and easy to use.
        </p>

        <div className="mx-auto mt-10 max-w-2xl">
          <input
            type="text"
            placeholder="Search for a tool..."
            className="w-full rounded-xl border border-white/20 bg-white p-4 text-black shadow-lg outline-none"
          />
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-gray-100">
            Browse Tools
          </button>

          <button className="rounded-xl border border-white px-6 py-3 hover:bg-white hover:text-blue-700">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}