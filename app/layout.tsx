import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { allYears, months } from "./utils/calendar";

import Link from "next/link";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <Link href="/">
          <h1 className="flex justify-around">
            <span className="letter">l</span>
            <span className="letter">a</span>
            <span className="letter">r</span>
            <span className="letter">i</span>
            <span className="letter">a</span>
            <span className="letter">t</span>
          </h1>
          </Link>
          <nav>
            <ul className="flex justify-around">
            {allYears().map(year =>
              <Link
              key={year}
              href={`/${year}`}>
                <li>{year}</li>
                </Link>)}
            </ul>
            <ul className="flex justify-around">
              <Link href="/cover"><li>cover</li></Link>
            {months.map(month => (

              <Link key={month} href={`/${month.toLowerCase()}`}><li>{month}</li></Link>
            ))}
            </ul>  
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
