"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { allYears, months } from "@/app/utils/calendar";
import { usePathname } from "next/navigation";

type LinksRef = {
  [key: string]: HTMLAnchorElement | null;
};

export default function Nav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const linksRef = useRef<LinksRef>({});
  useEffect(() => {
    if (pathname !== "/") {
      const activeLink = linksRef.current[pathname.split("/")[1]];

      if (activeLink) {
        activeLink.focus();
      }
    }
  }, [pathname]);
  return (
    <nav className="flex-wrap bg-gradient-to-r from-[rgb(34,193,195)] to-[rgb(253,187,45)]">
      <ul className="flex flex-wrap justify-around text-lg lg:flex-nowrap">
        {allYears().map((year) => (
          <Link
            ref={(el) => {
              linksRef.current[year] = el;
            }}
            className={`${isActive(`/${year}`) ? "outline" : ""} border-1 my-1 p-2 text-2xl outline-1 hover:outline-dotted focus:outline-dotted`}
            key={year}
            href={`/${year}`}
          >
            <li>{year}</li>
          </Link>
        ))}
      </ul>
      <ul className="flex flex-wrap justify-around text-center uppercase">
        <Link
          ref={(el) => {
            linksRef.current["cover"] = el;
          }}
          className={`${isActive(`/cover`) ? "underline" : ""} mb-5 basis-1/3 flex-wrap underline-offset-8 hover:underline hover:decoration-dotted focus:underline focus:decoration-dotted focus-visible:underline focus-visible:outline-none lg:basis-1 lg:flex-nowrap`}
          href="/cover"
        >
          <li>cover</li>
        </Link>
        {months.map((month) => (
          <Link
            ref={(el) => {
              linksRef.current[month] = el;
            }}
            className={`${isActive(`/${month}`) ? "underline" : ""} mb-5 basis-1/3 flex-wrap underline-offset-8 hover:underline hover:decoration-dotted focus:underline focus:decoration-dotted focus-visible:underline focus-visible:outline-none lg:basis-1 lg:flex-nowrap`}
            key={month}
            href={`/${month.toLowerCase()}`}
          >
            <li>{month}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
