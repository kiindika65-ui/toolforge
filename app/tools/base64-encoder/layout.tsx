import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder - Free Online Tool | ToolForge",

  description:
    "Encode text to Base64 and decode Base64 back to text instantly. Fast, free and secure online Base64 encoder and decoder tool.",

  keywords: [
    "Base64 encoder",
    "Base64 decoder",
    "Base64 converter",
    "encode text to Base64",
    "decode Base64",
    "developer tools",
    "online tools",
  ],

  authors: [
    {
      name: "ToolForge",
    },
  ],

  openGraph: {
    title: "Base64 Encoder & Decoder - ToolForge",

    description:
      "Free online Base64 encoder and decoder. Convert text to Base64 instantly.",

    type: "website",

  },

  twitter: {
    card: "summary",

    title:
      "Base64 Encoder & Decoder - ToolForge",

    description:
      "Encode and decode Base64 online for free.",
  },

  robots: {
    index: true,
    follow: true,
  },

};

export default function Base64Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}