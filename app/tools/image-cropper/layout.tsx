import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Cropper - Crop JPG, PNG & WebP Online | ToolForge",

  description:
    "Crop JPG, PNG and WebP images online for free. Select any area of your image, crop it instantly and download the result directly in your browser.",

  keywords: [
    "image cropper",
    "crop image",
    "crop image online",
    "JPG cropper",
    "JPEG cropper",
    "PNG cropper",
    "WebP cropper",
    "photo cropper",
    "online image cropper",
    "free image cropper",
    "crop photo online",
    "image cropping tool",
  ],

  authors: [
    {
      name: "ToolForge",
    },
  ],

  openGraph: {
    title: "Image Cropper - ToolForge",
    description:
      "Free online image cropper for JPG, PNG and WebP images.",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Image Cropper - ToolForge",
    description:
      "Crop images directly in your browser with ToolForge.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ImageCropperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}