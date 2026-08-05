import type { Metadata } from "next";


export const metadata: Metadata = {

  title:
    "Free Percentage Calculator - Calculate Percentages Online | ToolForge",

  description:
    "Calculate percentages, increases and decreases quickly with ToolForge free online percentage calculator.",

  keywords: [
    "percentage calculator",
    "percent calculator",
    "percentage increase calculator",
    "percentage decrease calculator",
    "math calculator",
  ],

};


export default function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return children;

}