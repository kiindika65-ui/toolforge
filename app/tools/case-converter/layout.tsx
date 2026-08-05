import type { Metadata } from "next";


export const metadata: Metadata = {

  title:
    "Free Case Converter - Convert Text Uppercase Lowercase Online | ToolForge",

  description:
    "Convert text between uppercase, lowercase, title case and sentence case with ToolForge free online case converter.",

  keywords: [
    "case converter",
    "uppercase converter",
    "lowercase converter",
    "text converter",
    "title case converter",
  ],

};


export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return children;

}