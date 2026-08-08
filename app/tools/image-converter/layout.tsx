import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Converter - JPG, PNG & WebP Online | ToolForge",

  description:
    "Convert JPG, PNG and WebP images online for free. Change image formats, adjust quality and download converted images instantly in your browser.",

  keywords: [
    "image converter",
    "image converter online",
    "JPG converter",
    "JPEG converter",
    "PNG converter",
    "WebP converter",
    "JPG to PNG",
    "PNG to JPG",
    "JPG to WebP",
    "PNG to WebP",
    "WebP to JPG",
    "WebP to PNG",
    "convert image online",
    "free image converter",
    "photo converter",
  ],

  authors: [
    {
      name: "ToolForge",
    },
  ],

  openGraph: {
    title: "Image Converter - JPG, PNG & WebP | ToolForge",

    description:
      "Free online image converter for JPG, PNG and WebP. Convert images directly in your browser.",

    type: "website",
  },

  twitter: {
    card: "summary",

    title: "Image Converter - ToolForge",

    description:
      "Convert JPG, PNG and WebP images online for free.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ImageConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}