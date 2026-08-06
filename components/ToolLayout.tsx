import type { ReactNode } from "react";
import Link from "next/link";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function ToolLayout({
  title,
  description,
  children,
}: ToolLayoutProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>

            <Link href="/tools" className="hover:text-blue-600">
              Tools
            </Link>

            <span className="mx-2">/</span>

            <span className="font-medium text-gray-900">{title}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="text-4xl font-bold">{title}</h1>

          <p className="mt-4 max-w-3xl text-blue-100">{description}</p>
        </div>
      </section>

      {/* Tool Content */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          {children}
        </div>
      </section>

      {/* Footer Info */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="mb-3 text-2xl font-bold">
            About this tool
          </h2>

          <p className="leading-7 text-gray-700">
            {description}
          </p>
        </div>
      </section>
    </main>
  );
}