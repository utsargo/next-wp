'use client';;
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import NavLink from './navlink';
import NavLinkMobile from './nav-link-mobile';
import siteData from '@/lib/get-sitedata';
import Container from './container';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-200/95 shadow-md z-50">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex flex-row items-center justify-start gap-2">
              <Link href="/" className="font-bold no-underline hover:no-underline">
                <Image
                  src={siteData.logo.src}
                  alt={siteData.logo.alt}
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
              </Link>
              <div className="flex flex-col items-start max-[767px]:hidden">
                <Link href="/" className="font-bold no-underline hover:no-underline">
                  <h4 className="no-underline hover:no-underline text-slate-900 hover:text-slate-800">
                    {siteData.siteInfo.title}
                  </h4>
                </Link>
                <p className="text-md">
                  {siteData.siteInfo.description}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {siteData.menuItems.map((item) => (
              <NavLink key={item.href} href={item.href} linkText={item.linkText} />
            ))}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {siteData.menuItems.map((item) => (
            <NavLinkMobile
              key={item.href}
              href={item.href}
              linkText={item.linkText}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Menu;
