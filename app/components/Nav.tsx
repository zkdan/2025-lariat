'use client'
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

import { allYears, months } from "@/app/utils/calendar";
import { usePathname } from "next/navigation"
import { ChevronDownIcon } from "@heroicons/react/16/solid";
type LinksRef = {
  [key: string]: HTMLAnchorElement | null;
};

export default function Nav() {
  const [isOpen, setIsOpen] = useState(true);

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
    if (pathname.includes(`/p/`)) {
      setIsOpen(false)
    }
  }, [pathname]);

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <nav className="bg-gradient-to-r from-[rgb(34,193,195)] to-[rgb(253,187,45)]  flex-wrap">
              <ul className="flex justify-around text-lg flex-wrap lg:flex-nowrap">
                {allYears().map(year =>
                  <Link
                    ref={
                      (el) => {
                        linksRef.current[year] = el
                      }
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
                  className={`${isActive(`/cover`) ? 'underline' : ''} flex-wrap basis-1/3  lg:flex-nowrap  lg:basis-1 mb-5 focus-visible:underline 
              focus-visible:outline-none 
              hover:underline 
              focus:underline 
              hover:decoration-dotted 
              focus:decoration-dotted 
              underline-offset-8 `}
                  href="/cover">
                  <li>cover</li>
                </Link>
                {months.map(month => (

                  <Link
                    ref={(el) => { linksRef.current[month] = el }}
                    className={`${isActive(`/${month}`) ? 'underline' : ''} flex-wrap basis-1/3  lg:flex-nowrap lg:basis-1 mb-5 focus-visible:underline 
              focus-visible:outline-none 
              hover:underline 
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
          </motion.nav>)}
      </AnimatePresence>

      <div className="flex justify-center group focus:outline-none">
        <button
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            hover:outline-dotted
          focus:outline-dotted outline-1 flex-grow
          lg:hidden transition-all duration-300 m-2 w-full text-center flex justify-center `}
        >
          <ChevronDownIcon
            height={44}
            width={44}
            stroke='white'
            className={`${isOpen ? 'rotate-180' : 'rotate-0 text-black top-0'}`}

          />
        </button>
      </div>

    </div>

  )
}