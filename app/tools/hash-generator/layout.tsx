import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hash Generator - SHA-1, SHA-256 & SHA-512 | ToolForge",

  description:
    "Free online hash generator for SHA-1, SHA-256 and SHA-512. Generate secure cryptographic hashes from text instantly in your browser.",

  keywords: [
    "hash generator",
    "SHA-1 generator",
    "SHA-256 generator",
    "SHA-512 generator",
    "SHA256 hash",
    "SHA512 hash",
    "online hash generator",
    "cryptographic hash",
    "developer tools",
  ],

  authors: [
    {
      name: "ToolForge",
    },
  ],

  openGraph: {
    title: "Hash Generator - SHA-1, SHA-256 & SHA-512 | ToolForge",
    description:
      "Generate SHA-1, SHA-256 and SHA-512 hashes online for free.",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Hash Generator - ToolForge",
    description:
      "Free online SHA-1, SHA-256 and SHA-512 hash generator.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function HashGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}