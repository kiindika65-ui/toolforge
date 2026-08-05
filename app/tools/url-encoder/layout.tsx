import type { Metadata } from "next";


export const metadata: Metadata = {

  title:
    "Free URL Encoder Decoder - Encode and Decode URLs Online | ToolForge",

  description:
    "Encode and decode URLs instantly with ToolForge free online URL encoder and decoder tool.",

  keywords: [
    "URL encoder",
    "URL decoder",
    "encode URL",
    "decode URL",
    "developer tools",
  ],

};


export default function URLEncoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return children;

}