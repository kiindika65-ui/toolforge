import type { Metadata } from "next";


export const metadata: Metadata = {

  title:
    "Free JSON Formatter - Format and Validate JSON Online | ToolForge",

  description:
    "Format, beautify and validate JSON data easily with ToolForge free online JSON formatter.",

  keywords: [
    "JSON formatter",
    "JSON validator",
    "JSON beautifier",
    "developer tools",
    "online JSON tool",
  ],

};


export default function JSONFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return children;

}