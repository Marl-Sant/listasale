'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiHome, HiUser } from 'react-icons/hi';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainLinks = [
    { href: '/sales', label: 'Find Sales' },
    { href: '/shop', label: 'Shop Online' },
    { href: '/hire', label: 'Hire Professionals' },
  ];

  return (
    <>
      {/* Purple Banner */}
      <div className="sticky top-0 bg-[#7a2b87] text-white py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 px-4 md:px-6 lg:px-8 xl:px-0 2xl:px-0 z-50">
        <div 
          className="max-w-7xl md:max-w-7xl lg:max-w-7xl xl:max-w-none 2xl:max-w-none mx-auto px-4 md:px-6 lg:px-8 xl:pl-2 2xl:pl-4 flex items-center justify-between text-sm md:text-base lg:text-lg xl:text-2xl 2xl:text-[2.25rem]" 
          style={{ fontFamily: 'var(--font-rig-sans)', textDecoration: 'none' }}
        >
          <div className="flex items-center">
            <Link 
              href="/subscribe" 
              className="underline hover:no-underline mr-1" 
              style={{ textDecoration: 'underline', color: 'white' }}
            >
              Subscribe
            </Link>
            <span>to receive notifications of upcoming sales in your area.</span>
          </div>
          
          {/* Register/Login */}
          <div className="hidden md:flex items-center">
            <Link
              href="/login"
              className="flex items-center space-x-2 text-white font-semibold hover:opacity-80 transition-opacity text-sm md:text-base lg:text-lg xl:text-2xl 2xl:text-[2.25rem]"
              style={{ fontFamily: 'var(--font-darkmode)', textDecoration: 'none' }}
            >
              <HiUser className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
              <span>Login/Register</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="sticky top-[40px] md:top-[35px] lg:top-[40px] xl:top-[45px] 2xl:top-[60px] bg-white w-full shadow-md z-40">
        <div className="max-w-7xl md:max-w-7xl lg:max-w-7xl xl:max-w-none 2xl:max-w-none mx-auto px-4 md:px-6 lg:px-8 xl:px-0 2xl:px-0 flex items-center justify-between h-28 md:h-20 lg:h-24 xl:h-28 2xl:h-32">
                
          {/* Logo and Main */}
          <div className="flex items-center">
            <div className="flex items-center">
              <Link href="/">
                <img 
                  src="/images/ListLogo.png" 
                  alt="List A Sale" 
                  className="h-24 md:h-28 lg:h-32 xl:h-36 2xl:h-40" 
                  style={{ textDecoration: 'none' }}
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center md:gap-5 lg:gap-8 xl:gap-10 2xl:gap-12 md:ml-4 lg:ml-8 xl:ml-12 2xl:ml-16">
              {mainLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium hover:opacity-80 transition-opacity text-xs md:text-sm lg:text-base xl:text-[1.667rem] 2xl:text-[1.875rem] ${index > 0 ? 'md:-ml-1 lg:ml-0' : ''}`}
                  style={{ fontFamily: 'var(--font-darkmode)', color: '#693073', textDecoration: 'none' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Links */}
          <div className="hidden md:flex items-center space-x-3 md:space-x-4 lg:space-x-6 xl:space-x-8 2xl:space-x-10">
            <Link
              href="/create-listing"
              className="flex items-center space-x-2 text-[#1288e0] font-semibold hover:opacity-80 transition-opacity text-xs md:text-sm lg:text-base xl:text-[1.667rem] 2xl:text-[1.875rem]"
              style={{ fontFamily: 'var(--font-darkmode)', textDecoration: 'none' }}
            >
              <HiHome className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
              <span>Create a Listing</span>
            </Link>
            
            {/* <Link
              href="/login"
              className="flex items-center space-x-2 text-[#1288e0] font-semibold hover:opacity-80 transition-opacity text-xs md:text-sm lg:text-base xl:text-[1.667rem]"
              style={{ fontFamily: 'var(--font-darkmode)', textDecoration: 'none' }}
            >
              <HiUser className="w-4 h-4 md:w-4 lg:w-5 lg:h-5" />
              <span>Login</span>
            </Link>

            <Link
              href="/signup"
              className="flex items-center space-x-2 text-[#1288e0] font-semibold hover:opacity-80 transition-opacity text-xs md:text-sm lg:text-base xl:text-[1.667rem]"
              style={{ fontFamily: 'var(--font-darkmode)', textDecoration: 'none' }}
            >
              <span>Register</span>
            </Link>

            <Link
              href="/test"
              className="flex items-center space-x-2 text-[#1288e0] font-semibold hover:opacity-80 transition-opacity text-xs md:text-sm lg:text-base xl:text-[1.667rem]"
              style={{ fontFamily: 'var(--font-darkmode)', textDecoration: 'none' }}
            >
              <span>Testing Env</span>
            </Link> */}
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
