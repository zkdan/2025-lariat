'use client'
import { useRef, useEffect } from "react";
import Link from "next/link";
import { allYears, months } from "@/app/utils/calendar";
import { usePathname } from "next/navigation"

type LinksRef = {
  [key: string]: HTMLAnchorElement | null;
};

export default function Nav() {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path;
  const linksRef = useRef<LinksRef>({});
  useEffect(() => {
    if (pathname !== '/') {
      const activeLink = linksRef.current[pathname.split('/')[1]];

      if (activeLink) {
        activeLink.focus();
      }
    }
  }, [pathname]);
  return (
    <nav className="bg-gradient-to-r from-[rgb(34,193,195)] to-[rgb(253,187,45)]  flex-wrap">
      <ul className="flex justify-around text-lg flex-wrap lg:flex-nowrap">
        {allYears().map(year =>
          <Link
            ref={
              (el) => { 
                linksRef.current[year] = el }
            }
            className={`${isActive(`/${year}`) ? 'outline' : ''} p-2 my-1  border-1 outline-1
      text-2xl hover:outline-dotted focus:outline-dotted`}
            key={year}
            href={`/${year}`}>
            <li >{year}</li>
          </Link>)
        }
      </ul>
      <ul className="flex justify-around uppercase flex-wrap text-center">
        <Link
          ref={(el) => { linksRef.current['cover'] = el }}

          className={`${isActive(`/cover`) ? 'underline' : ''} flex-wrap basis-1/3  lg:flex-nowrap lg:basis-1 focus-visible:outline-none 
          hover:decoration-dotted 
          focus-visible:decoration-dotted
          focus:decoration-dotted
          underline-offset-8 `}
          href="/cover">
          <li>cover</li>
        </Link>
        {months.map(month => (

          <Link
            ref={(el) => { linksRef.current[month] = el }}

            className={`${isActive(`/${month}`) ? 'underline' : ''} flex-wrap basis-1/3  lg:flex-nowrap lg:basis-1 mb-5 focus-visible:underline 
              focus-visible:outline-none hover:underline 
              focus:underline 
              hover:decoration-dotted 
              focus:decoration-dotted 
              underline-offset-8 `}
            key={month}
            href={`/${month.toLowerCase()}`}><li
            >{month}</li></Link>
        ))}
      </ul>
    </nav>
  )
}