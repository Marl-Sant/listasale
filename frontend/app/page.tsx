'use client';

import { useSelector } from 'react-redux';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import type { RootState } from '../store/store';

export default function HomePage() {
  const user = useSelector((state: RootState) => state.session.user);

  return (
    <main>
      {/* Hero Image */}
      <div className="relative w-full aspect-video overflow-hidden flex flex-col items-center justify-center">
        <img src="/images/firstHomeImage.jpg" alt="List A Sale" className="h-full w-full object-cover absolute inset-0"/>
        
        <div 
          className="absolute top-[23%] md:top-[20%] lg:top-[20%] xl:top-[21%] left-0 right-0 text-center text-white text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold w-full max-w-full px-4" 
          style={{ fontFamily: 'var(--font-darkmode)' }}
        >
          <div className="flex flex-col">
            <span className="whitespace-nowrap">Let's find your next</span>
            <span className="mt-3 md:mt-6 lg:mt-8">hidden treasure</span>
          </div>
        </div>

        <div 
          className="absolute top-[45%] md:top-[48%] lg:top-[45%] xl:top-[46%] left-0 right-0 text-center text-white text-base md:text-xl lg:text-2xl font-bold w-full max-w-full px-4"
          style={{ fontFamily: 'var(--font-rig-sans)' }}
        >
          <span>A smarter way to search for<br /> estate sales and vintage goods</span>
        </div>

        <div className="absolute md:top-[62%] lg:top-[60%] xl:top-[58%] left-0 right-0 flex gap-4 md:gap-6 lg:gap-7 xl:gap-15 flex-wrap justify-center w-full max-w-full px-4">
          <button className="btn btn-primary btn-lg px-4 md:px-10 lg:px-12 min-w-[140px] md:min-w-[170px] lg:min-w-[180px]">
            Find Sales
          </button>
          <button className="btn btn-primary btn-lg px-4 md:px-10 lg:px-12 min-w-[140px] md:min-w-[170px] lg:min-w-[180px]">
            Shop Online
          </button>
        </div>

        {/* Search Bar */}
        <div className="input-group border-2 border-white max-w-md md:max-w-lg lg:max-w-xl xl:max-w-4xl mx-auto">
          <input 
            type="search" 
            className="form-control rounded-none" 
            placeholder="Find what you love: item, city, seller..." 
          />
          <button className="btn btn-primary rounded-none" type="button">
            <HiMagnifyingGlass className="w-5 h-5" />
          </button>
        </div>

      </div>
      
      {/* Future content sections should use: */}
      {/* <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8"> */}
      {/*   Content here */}
      {/* </section> */}
    </main>
  );
}
