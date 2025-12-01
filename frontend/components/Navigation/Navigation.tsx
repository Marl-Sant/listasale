'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiHome, HiUser } from 'react-icons/hi';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainLinks = [
    { href: '/sales', label: 'Find Sales' },
    { href: '/shop', label: 'Shop Online' },
    { href: '/hire', label: 'Hire Professionals' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <>
      {/* Purple Banner */}
      <div className="fixed top-0 left-0 right-0 bg-[#7a2b87] text-white py-2 px-4 z-50">
        <div className="max-w-7xl mx-auto text-sm" style={{ fontFamily: 'var(--font-rig-sans)' }}>
          <span className="underline">Subscribe</span> to receive notifications of upcoming sales in your area.
        </div>
      </div>

      {/* Main Nav */}
      <nav className="sticky top-[35px] bg-white w-full shadow-md z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center ">
            <Link href="/">
              <img src="/images/ListLogo.png" alt="List A Sale" className="h-20 md:h-20" />
            </Link>
          </div>

          {/* Main Links*/}
          <div className="hidden md:flex items-center md:gap-2 lg:gap-4 xl:gap-4 flex-1 md:ml-4 lg:ml-8">
            {mainLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium hover:opacity-80 transition-opacity text-xs md:text-sm lg:text-base ${index > 0 ? 'md:-ml-1 lg:ml-0' : ''}`}
                style={{ fontFamily: 'var(--font-darkmode)', color: '#693073', textDecoration: 'none' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Links */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-6 ml-auto">
            <Link
              href="/create-listing"
              className="flex items-center space-x-2 text-[#1288e0] font-semibold hover:opacity-80 transition-opacity text-xs md:text-sm lg:text-base"
              style={{ fontFamily: 'var(--font-darkmode)', textDecoration: 'none' }}
            >
              <HiHome className="w-4 h-4 md:w-4 lg:w-5 lg:h-5" />
              <span>Create a Listing</span>
            </Link>
            <Link
              href="/login"
              className="flex items-center space-x-2 text-[#1288e0] font-semibold hover:opacity-80 transition-opacity text-xs md:text-sm lg:text-base"
              style={{ fontFamily: 'var(--font-darkmode)', textDecoration: 'none' }}
            >
              <HiUser className="w-4 h-4 md:w-4 lg:w-5 lg:h-5" />
              <span>Login/Register</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex flex-col space-y-1"
            >
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white w-full py-4 border-t">
            <ul className="flex flex-col space-y-4 px-4">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#693073] font-medium uppercase tracking-wide block hover:opacity-80 transition-opacity"
                    style={{ fontFamily: 'var(--font-darkmode)' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t">
                <Link
                  href="/create-listing"
                  className="flex items-center space-x-2 text-[#1288e0] font-semibold hover:opacity-80 transition-opacity"
                  style={{ fontFamily: 'var(--font-darkmode)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <HiHome className="w-5 h-5" />
                  <span>Create a Listing</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="flex items-center space-x-2 text-[#1288e0] font-semibold hover:opacity-80 transition-opacity"
                  style={{ fontFamily: 'var(--font-darkmode)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <HiUser className="w-5 h-5" />
                  <span>Login/Register</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}