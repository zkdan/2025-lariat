import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "700"],
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
      <body className={`${roboto.variable} antialiased`}>
        <header>
          <Link
            className="hover:text-blue-300 hover:outline-none focus:text-blue-300 focus:outline-none"
            href="/"
          >
            <h1 className="flex justify-around text-5xl font-bold uppercase">
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
