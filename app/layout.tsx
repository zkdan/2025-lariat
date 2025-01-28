import type { Metadata } from "next";
import { Roboto} from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";



import Link from "next/link";
const roboto = Roboto({
  variable: "--font-roboto",
  weight: ['300', "400", '700']
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
        className={`${roboto.variable} antialiased`}
      >
        <header>
          <Link href="/">
          <h1 className="flex justify-around text-5xl font-bold uppercase ">
            <span className="letter">l</span>
            <span className="letter">a</span>
            <span className="letter">r</span>
            <span className="letter">i</span>
            <span className="letter">a</span>
            <span className="letter">t</span>
          </h1>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
