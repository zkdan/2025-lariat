import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

import Logo from '@/app/components/Logo';
const roboto = Roboto({
  variable: "--font-roboto",
  weight: ['300', "400", '700'],
  subsets: ['latin']
});


export const metadata: Metadata = {
  title: "Lariat",
  description: "hand made collage art",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased min-h-dvh`}
      >
        <Logo />
        <Nav />
        {children}
      </body>
    </html>
  );
}
