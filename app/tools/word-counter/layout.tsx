import type { Metadata } from "next";


export const metadata: Metadata = {

  title:
    "Free Word Counter - Count Words and Characters Online | ToolForge",

  description:
    "Count words, characters, sentences and paragraphs instantly with ToolForge free online word counter.",

  keywords: [
    "word counter",
    "character counter",
    "word count tool",
    "text analyzer",
  ],

};


export default function WordCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return children;

}