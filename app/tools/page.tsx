
import Link from "next/link";

const tools = [
  {
    name: "Age Calculator",
    description: "Calculate your exact age in years, months and days.",
    icon: "🎂",
    href: "/tools/age-calculator",
  },
  {
    name: "BMI Calculator",
    description: "Calculate your body mass index and health category.",
    icon: "⚖️",
    href: "/tools/bmi-calculator",
  },
  {
    name: "Password Generator",
    description: "Create strong secure passwords instantly.",
    icon: "🔐",
    href: "/tools/password-generator",
  },
  {
    name: "Word Counter",
    description: "Count words, characters and sentences instantly.",
    icon: "📝",
    href: "/tools/word-counter",
  },
  {
    name: "QR Code Generator",
    description: "Create and download QR codes instantly.",
    icon: "📱",
    href: "/tools/qr-generator",
  },
  {
    name: "Unit Converter",
    description: "Convert length, weight and temperature units.",
    icon: "🔄",
    href: "/tools/unit-converter",
  },
  {
    name: "Case Converter",
    description: "Convert text to uppercase, lowercase and title case.",
    icon: "🔤",
    href: "/tools/case-converter",
  },
  {
    name: "JSON Formatter",
    description: "Format, validate and minify JSON data.",
    icon: "💻",
    href: "/tools/json-formatter",
  },
  {
    name: "URL Encoder / Decoder",
    description: "Encode and decode URLs quickly and easily.",
    icon: "🔗",
    href: "/tools/url-encoder",
  },
  {
    name: "Percentage Calculator",
    description: "Calculate percentages, increases and decreases.",
    icon: "📊",
    href: "/tools/percentage-calculator",
  },
  {
    name: "Image Compressor",
    description: "Compress JPG, PNG and WebP images.",
    icon: "🗜️",
    href: "/tools/image-compressor",
  },
  {
    name: "Image Resizer",
    description: "Resize images to your required dimensions.",
    icon: "📐",
    href: "/tools/image-resizer",
  },
  {
    name: "Image Cropper",
    description: "Crop images to the exact area you need.",
    icon: "✂️",
    href: "/tools/image-cropper",
  },
  {
    name: "Image Converter",
    description: "Convert JPG, PNG and WebP images between formats.",
    icon: "🔄",
    href: "/tools/image-converter",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600"
          >
            ToolForge
          </Link>

          <div className="flex gap-6">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>

            <Link
              href="/tools"
              className="font-semibold text-blue-600"
            >
              Tools
            </Link>

            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>

            <Link href="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-6 py-20 text-center text-white">
        <h1 className="text-5xl font-extrabold">
          All Tools
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
          Explore our collection of free online tools for
          calculations, text, development, images and more.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group"
            >
              <div className="h-full rounded-2xl bg-white p-6 shadow transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="text-5xl">
                  {tool.icon}
                </div>

                <h2 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-blue-600">
                  {tool.name}
                </h2>

                <p className="mt-2 text-gray-600">
                  {tool.description}
                </p>

                <div className="mt-5 font-semibold text-blue-600">
                  Use Tool →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 py-10 text-center text-gray-400">
        <p>
          © 2026 ToolForge. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
