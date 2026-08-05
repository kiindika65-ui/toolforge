import type { Metadata } from "next";


export const metadata: Metadata = {

  title:
    "Free Age Calculator - Calculate Your Age Online | ToolForge",

  description:
    "Calculate your exact age in years, months and days with ToolForge free online age calculator.",

  keywords: [
    "age calculator",
    "calculate age",
    "birthday calculator",
    "online age tool",
  ],

};


export default function AgeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return children;

}