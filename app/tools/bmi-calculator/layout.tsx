import type { Metadata } from "next";


export const metadata: Metadata = {

  title:
    "Free BMI Calculator - Calculate Body Mass Index | ToolForge",

  description:
    "Calculate your Body Mass Index (BMI) quickly with ToolForge free online BMI calculator.",

  keywords: [
    "BMI calculator",
    "body mass index calculator",
    "health calculator",
    "weight calculator",
  ],

};


export default function BMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return children;

}