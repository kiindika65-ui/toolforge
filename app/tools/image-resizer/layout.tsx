import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Resizer - Resize JPG, PNG & WebP Online | ToolForge",

  description:
    "Resize JPG, PNG and WebP images online for free. Change image width and height, preserve aspect ratio, and download resized images directly in your browser.",

  keywords: [
    "image resizer",
    "resize image",
    "resize image online",
    "JPG resizer",
    "JPEG resizer",
    "PNG resizer",
    "WebP resizer",
    "resize photo",
    "image dimensions",
    "change image size",
    "free image resizer",
    "online image resizer",
  ],

  authors: [
    {
      name: "ToolForge",
    },
  ],

  openGraph: {
    title: "Image Resizer - ToolForge",
    description:
      "Free online image resizer for JPG, PNG and WebP images.",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Image Resizer - ToolForge",
    description:
      "Resize JPG, PNG and WebP images directly in your browser.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ImageResizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}