import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator - Free Online UUID v4 Generator | ToolForge",

  description:
    "Generate random UUID v4 identifiers instantly with our free online UUID generator. Create secure unique IDs for apps, databases and APIs.",

  keywords: [
    "UUID generator",
    "UUID v4 generator",
    "random UUID",
    "unique identifier generator",
    "developer tools",
    "online UUID tool",
  ],

  authors: [
    {
      name: "ToolForge",
    },
  ],

  openGraph: {
    title: "UUID Generator - ToolForge",

    description:
      "Generate random UUID v4 identifiers quickly and securely online.",

    type: "website",
  },

  twitter: {
    card: "summary",

    title:
      "UUID Generator - ToolForge",

    description:
      "Free online UUID v4 generator for developers.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function UUIDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}