import type { Metadata } from "next";


export const metadata: Metadata = {

  title:
    "Free Password Generator - Create Strong Passwords | ToolForge",

  description:
    "Generate strong and secure random passwords instantly with ToolForge free password generator.",

  keywords: [
    "password generator",
    "secure password",
    "random password generator",
    "strong password",
  ],

};


export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return children;

}