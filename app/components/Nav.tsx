'use client'
import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from "next/navigation"
import { allYears, months } from "@/app/utils/calendar";
import { ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

type LinksRef = {
  [key: string]: HTMLAnchorElement | null;
};

export default function Nav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const linksRef = useRef<LinksRef>({});
  const isSinglePage = pathname.includes(`/p/`);
  const lastFilterPage = useRef('/');

  useEffect(() => {
    if (isSinglePage) {
      setIsOpen(false);
    } else {
      const saved = localStorage.getItem('navMenuOpen');
      if (saved !== null) {
        setIsOpen(saved === 'true');
      }
    }
  }, [isSinglePage]);

  useEffect(() => {
    if (!pathname.startsWith('/p/')) {
      lastFilterPage.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') {
      const activeLink = linksRef.current[pathname.split('/')[1]];
      if (activeLink) {
        activeLink.focus();
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (!isSinglePage) {
      localStorage.setItem('navMenuOpen', String(isOpen));
    }
  }, [isOpen, isSinglePage]);

  const handleNavigation = useCallback((direction: 'prev' | 'next') => {
    if (!isSinglePage) return;

    const currentPath = pathname.split('/p/')[1];

    if (currentPath.startsWith('cover-')) {
      const yearNum = parseInt(currentPath.split('-')[1]);
      if (direction === 'next') {
        router.push(`/p/01-${yearNum}`);
      } else {
        window.location.href = `/p/12-${yearNum - 1}`;
      }
      return;
    }

    const [month, year] = currentPath.split('-');
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (direction === 'next') {
      if (monthNum === 12) {
        router.push(`/p/cover-${yearNum + 1}`);
      } else {
        router.push(`/p/${(monthNum + 1).toString().padStart(2, '0')}-${yearNum}`);
      }
    } else {
      if (monthNum === 1) {
        router.push(`/p/cover-${yearNum}`);
      } else {
        router.push(`/p/${(monthNum - 1).toString().padStart(2, '0')}-${yearNum}`);
      }
    }
  }, [isSinglePage, router, pathname]);

  const isFirstEntry = pathname === `/p/cover-2015`;
  const isLastEntry = pathname === `/p/12-${allYears()[allYears().length - 1]}`;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || !isSinglePage) return;

      switch (e.key) {
        case 'ArrowLeft':
          if (!isFirstEntry) {
            handleNavigation('prev');
          }
          break;
        case 'ArrowRight':
          if (!isLastEntry) {
            handleNavigation('next');
          }
          break;
        case 'Escape':
          setIsOpen(prev => {
            const newState = !prev;
            if (!isSinglePage) {
              localStorage.setItem('navMenuOpen', String(newState));
            }
            return newState;
          });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSinglePage, isFirstEntry, isLastEntry, handleNavigation]);

  return (
    <div className="sticky md:relative top-0 z-10">
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

      <div className="flex justify-between sticky top-0 z-10">
        <button
          onClick={() => handleNavigation('prev')}
          className={`flex items-center hover:outline-dotted focus:outline-dotted outline-1 m-2 pr-2 basis-1/3 ${!isSinglePage || isFirstEntry ? 'invisible' : 'visible'}`}
          aria-label="Previous image"
        >
          <ChevronLeftIcon height={24} width={24} /> Previous
        </button>

        <div className="flex flex-grow justify-center group focus:outline-none">
          <button
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            onClick={() => {
              const newState = !isOpen;
              setIsOpen(newState);
              if (!isSinglePage) {
                localStorage.setItem('navMenuOpen', String(newState));
              }
            }}
            className={`
            hover:outline-dotted
            focus:outline-dotted outline-1 flex-grow
            transition-all duration-300 m-2 w-full text-center flex justify-center `}
          >
            {isOpen ? <ChevronUpIcon
              height={30}
              width={30}
            /> : (<ChevronDownIcon
              height={30}
              width={30}
            />)}
          </button>
        </div>

        <button
          onClick={() => handleNavigation('next')}
          className={`flex items-center justify-end hover:outline-dotted focus:outline-dotted outline-1 m-2 pl-2 basis-1/3 ${!isSinglePage || isLastEntry ? 'invisible' : 'visible'}`}
          aria-label="Next image"
        >
          Next <ChevronRightIcon height={24} width={24} />
        </button>
      </div>
    </div>

  )
}
