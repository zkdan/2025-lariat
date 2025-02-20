import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Nav from "./components/Nav";
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
        className={`${roboto.variable} antialiased`}
      >
        <header>
          <Link className="focus:outline-none group" href="/">
            <h1 className="flex justify-around text-5xl font-bold uppercase relative overflow-hidden">
              <div className="absolute inset-0 w-full h-full  opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-700 -z-10" />
              <span className="letter transition-all duration-300 group-hover:text-[rgb(34,193,195)] group-focus:text-[rgb(34,193,195)]" style={{ transitionDelay: '0ms' }}>l</span>
              <span className="letter transition-all duration-300 group-hover:text-[rgb(78,192,157)] group-focus:text-[rgb(78,192,157)]" style={{ transitionDelay: '50ms' }}>a</span>
              <span className="letter transition-all duration-300 group-hover:text-[rgb(122,191,119)] group-focus:text-[rgb(122,191,119)]" style={{ transitionDelay: '100ms' }}>r</span>
              <span className="letter transition-all duration-300 group-hover:text-[rgb(166,190,81)] group-focus:text-[rgb(166,190,81)]" style={{ transitionDelay: '150ms' }}>i</span>
              <span className="letter transition-all duration-300 group-hover:text-[rgb(210,189,43)] group-focus:text-[rgb(210,189,43)]" style={{ transitionDelay: '200ms' }}>a</span>
              <span className="letter transition-all duration-300 group-hover:text-[rgb(253,187,45)] group-focus:text-[rgb(253,187,45)]" style={{ transitionDelay: '250ms' }}>t</span>
            </h1>
          </Link>
        </header>
        <Nav />
        {children}
      </body>
    </html>
  );
}
