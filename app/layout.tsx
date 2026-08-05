import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {

  title: "ToolForge - Free Online Tools",

  description:
    "Free online tools including calculators, generators, converters and developer utilities.",

  keywords: [
    "online tools",
    "free tools",
    "calculator",
    "password generator",
    "word counter",
    "QR code generator",
    "developer tools",
  ],

  authors: [
    {
      name: "ToolForge",
    },
  ],

  openGraph: {

    title:
      "ToolForge - Free Online Tools",

    description:
      "Fast, simple and free online tools for everyone.",

    type:
      "website",

  },

};


export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {

  return (

    <html lang="en">

      <body>

        {children}

      </body>

    </html>

  );

}