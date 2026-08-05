import type { Metadata } from "next";


export const metadata: Metadata = {

  title:
    "Free QR Code Generator - Create QR Codes Online | ToolForge",

  description:
    "Generate free QR codes instantly for text, links and websites with ToolForge online QR code generator.",

  keywords: [
    "QR code generator",
    "free QR code maker",
    "create QR code",
    "online QR tool",
  ],

};


export default function QRGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return children;

}