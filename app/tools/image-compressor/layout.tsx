import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Compressor - Compress JPG, PNG & WebP Online | ToolForge",

  description:
    "Compress JPG, PNG and WebP images online for free. Reduce image file size, adjust quality and download compressed images directly in your browser.",

  keywords: [
    "image compressor",
    "compress image",
    "JPG compressor",
    "JPEG compressor",
    "PNG compressor",
    "WebP compressor",
    "image size reducer",
    "compress images online",
    "free image compressor",
    "online image tools",
  ],

  authors: [
    {
      name: "ToolForge",
    },
  ],

  openGraph: {
    title: "Image Compressor - ToolForge",
    description:
      "Free online image compressor for JPG, PNG and WebP images.",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Image Compressor - ToolForge",
    description:
      "Compress JPG, PNG and WebP images directly in your browser.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ImageCompressorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}