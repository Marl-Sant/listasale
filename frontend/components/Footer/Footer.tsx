'use client';

import Link from 'next/link';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#002861] text-white pt-10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-9 lg:px-5 xl:px-9">
      <div className="flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-12">
          
          {/* Logo and Social Media */}
          <div className="flex flex-col">
            <div className="flex flex-col md:w-[100px] lg:w-full">
                <Link href="/">
                    <img 
                    src="/images/ListLogo.png" 
                    alt="List A Sale" 
                    className="md:h-25 lg:h-30 xl:h-40"
                    />
                </Link>
            </div>
            
            {/* Social Media Icons */}
            <div className="w-[100px] lg:w-full flex items-center justify-center gap-3">
              <a 
                href="#" 
                className="md:w-5 md:h-5 lg:w-8 lg:h-8 rounded-full border-2 border-white bg-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram 
                    className="w-5 h-5" 
                    style={{ color: '[#002861]' }}
                />
              </a>
              <a 
                href="#" 
                className="md:w-5 md:h-5 lg:w-8 lg:h-8 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook 
                    className="w-8 h-8" 
                    style={{ color: 'white' }}
                />
              </a>
              <a 
                href="#" 
                className="md:w-5 md:h-5 lg:w-8 lg:h-8 rounded-full border-2 border-white bg-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:max-w-[410px] lg:max-w-[480px] xl:max-w-none flex flex-col justify-center md:flex-row md:gap-12 lg:gap-16  xl:gap-24 flex-1">
            {/* Home Column */}
            <div>
              <span 
                className="block font-bold mb-3 md:text-base lg:text-lg xl:text-xl"
                style={{ fontFamily: 'var(--font-darkmode)' }}
              >
                Home
              </span>
              <ul 
                className="space-y-2 list-none" 
                style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}
              >
                <li style={{ margin: 0, padding: 0 }}>
                  <Link 
                    href="/sales" 
                    className="block hover:underline mb-2 md:text-sm lg:text-base xl:text-lg"
                    style={{ 
                            fontFamily: 'var(--font-rig-sans)', 
                            textDecoration: 'none', 
                            color:'white' 
                          }}
                  >
                    Find Sales
                  </Link>
                </li>
                <li style={{ margin: 0, padding: 0 }}>
                  <Link 
                    href="/shop" 
                    className="block hover:underline mb-2 md:text-sm lg:text-base xl:text-lg"
                    style={{ 
                            fontFamily: 'var(--font-rig-sans)', 
                            textDecoration: 'none', 
                            color:'white' 
                          }}
                  >
                    Shop Online
                  </Link>
                </li>
                <li style={{ margin: 0, padding: 0 }}>
                  <Link 
                    href="/hire" 
                    className="block hover:underline mb-2 md:text-sm lg:text-base xl:text-lg"
                    style={{ 
                            fontFamily: 'var(--font-rig-sans)', 
                            textDecoration: 'none', 
                            color:'white' 
                          }}
                  >
                    Hire Professionals
                  </Link>
                </li>
                <li style={{ margin: 0, padding: 0 }}>
                  <Link 
                    href="/about" 
                    className="block hover:underline md:text-sm lg:text-base xl:text-lg"
                    style={{ 
                            fontFamily: 'var(--font-rig-sans)', 
                            textDecoration: 'none', 
                            color:'white' 
                          }}
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get Started */}
            <div>
              <span 
                className="block mb-3 md:text-base lg:text-lg xl:text-xl"
                style={{ fontFamily: 'var(--font-darkmode)' }}
              >
                Get Started
              </span>
              <ul 
                className="space-y-2 list-none" 
                style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}
              >
                <li style={{ margin: 0, padding: 0 }}>
                  <Link 
                    href="/list-item" 
                    className="block hover:underline mb-2 md:text-sm lg:text-base xl:text-lg"
                    style={{ 
                            fontFamily: 'var(--font-rig-sans)', 
                            textDecoration: 'none', 
                            color:'white',
                          }}
                  >
                    List An Item
                  </Link>
                </li>
                <li style={{ margin: 0, padding: 0 }}>
                  <Link 
                    href="/list-sale" 
                    className="block hover:underline mb-2 md:text-sm lg:text-base xl:text-lg"
                    style={{ 
                            fontFamily: 'var(--font-rig-sans)', 
                            textDecoration: 'none', 
                            color:'white',
                          }}
                  >
                    List A Sale
                  </Link>
                </li>
                <li style={{ margin: 0, padding: 0 }}>
                  <Link 
                    href="/pricing" 
                    className="block hover:underline mb-2 md:text-sm lg:text-base xl:text-lg"
                    style={{ 
                            fontFamily: 'var(--font-rig-sans)', 
                            textDecoration: 'none', 
                            color:'white',
                          }}
                  >
                    Pricing
                  </Link>
                </li>
                <li style={{ margin: 0, padding: 0 }}>
                  <Link 
                    href="/articles" 
                    className="block hover:underline mb-2 md:text-sm lg:text-base xl:text-lg"
                    style={{ 
                            fontFamily: 'var(--font-rig-sans)', 
                            textDecoration: 'none', 
                            color:'white',
                          }}
                  >
                    Articles
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <span 
                className="block mb-3 md:text-base lg:text-lg xl:text-xl"
                style={{ fontFamily: 'var(--font-darkmode)' }}
              >
                Support
              </span>
              <ul 
                className="space-y-2 list-none" 
                style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}
              >
                <li style={{ margin: 0, padding: 0 }}>
                  <Link 
                    href="/faqs" 
                    className="block hover:underline mb-2 md:text-sm lg:text-base xl:text-lg"
                    style={{ 
                            fontFamily: 'var(--font-rig-sans)', 
                            textDecoration: 'none', 
                            color:'white',
                          }}
                  >
                    FAQs
                  </Link>
                </li>
                <li style={{ margin: 0, padding: 0 }}>
                  <Link 
                    href="/contact" 
                    className="block hover:underline mb-2 md:text-sm lg:text-base xl:text-lg"
                    style={{ 
                            fontFamily: 'var(--font-rig-sans)', 
                            textDecoration: 'none', 
                            color:'white',
                          }}
                  >
                    Contact Us
                  </Link>
                </li>
                <li style={{ margin: 0, padding: 0 }}>
                  <Link 
                    href="/privacy-policy" 
                    className="block hover:underline mb-2 md:text-sm lg:text-base xl:text-lg"
                    style={{ 
                            fontFamily: 'var(--font-rig-sans)', 
                            textDecoration: 'none', 
                            color:'white',
                          }}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li style={{ margin: 0, padding: 0 }}>
                  <Link 
                    href="/terms-of-service" 
                    className="block hover:underline mb-2 md:text-sm lg:text-base xl:text-lg"
                    style={{ 
                            fontFamily: 'var(--font-rig-sans)', 
                            textDecoration: 'none', 
                            color:'white',
                          }}
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Subscription */}
          <div className="md:max-w-[280px] lg:max-w-[339px] xl:max-w-[450px]">
            <span 
              className="mb-2 md:text-xl lg:text-2xl xl:text-3xl"
              style={{ fontFamily: 'var(--font-darkmode)' }}
            >
              Subscribe to our newsletter
            </span>
            <p 
              className="md:max-w-[280px] lg:max-w-[339px] xl:max-w-none md:text-xs lg:text-sm xl:text-base mb-2"
              style={{ fontFamily: 'var(--font-rig-sans)' }}
            >
              Receive notifications of upcoming sales in your area.
            </p>
            
            <form className="space-y-3 md:max-w-[280px] lg:max-w-[339px] xl:max-w-none">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="form-control flex-1"
                  style={{ 
                    fontFamily: 'var(--font-rig-sans)',
                  }}
                />
                <input 
                  type="text" 
                  placeholder="Zip Code" 
                  className="form-control flex-1"
                  style={{ fontFamily: 'var(--font-rig-sans)' }}
                />
              </div>
              <input 
                type="email" 
                placeholder="Email address" 
                className="form-control w-full mb-3"
                style={{ fontFamily: 'var(--font-rig-sans)' }}
              />
              <button 
                type="submit" 
                className="btn btn-primary w-full"
                style={{ 
                  fontFamily: 'var(--font-rig-sans)',
                  backgroundColor: '#693073',
                  borderColor: '#693073',
                  fontWeight: 'bold',
                }}
              >
                Subscribe
              </button>
            </form>

            <p 
              className="md:max-w-[280px] lg:max-w-[339px] xl:max-w-none md:text-xs lg:text-sm xl:text-base mt-2 text-white/80"
              style={{ fontFamily: 'var(--font-rig-sans)' }}
            >
              By clicking "Subscribe", you agree to receive emails and have read our{' '}
              <Link href="/website-usage" className="underline hover:no-underline">
                website usage
              </Link>
              {' '}and{' '}
              <Link href="/privacy-policy" className="underline hover:no-underline">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}