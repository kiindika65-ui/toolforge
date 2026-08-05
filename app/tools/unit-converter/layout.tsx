import type { Metadata } from "next";


export const metadata: Metadata = {

  title:
    "Free Unit Converter - Convert Length, Weight and Temperature | ToolForge",

  description:
    "Convert units easily including length, weight and temperature with ToolForge free online unit converter.",

  keywords: [
    "unit converter",
    "length converter",
    "weight converter",
    "temperature converter",
    "online converter",
  ],

};


export default function UnitConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return children;

}