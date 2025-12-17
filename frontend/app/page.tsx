'use client';

import { useSelector } from 'react-redux';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import type { RootState } from '../store/store';
import CategorySection from '../components/CategorySection/CategorySection';
import NearYouSection from '../components/SalesNearYouSection/SalesNearYou';
import ItemsNearYouSection from '../components/ItemsNearYouSection/ItemsNearYou';
import PromotionalSection from '../components/PromotionalSection/PromotionalSection';
import CarouselSection from '../components/CarouselSection/CarouselSection';


import ExploreAllButton from '../components/ExploreAllButton/ExploreAllButton';

export default function HomePage() {
  const user = useSelector((state: RootState) => state.session.user);

  return (
    <main>
      {/* Hero Image */}
      <div className="relative w-full aspect-video overflow-hidden flex flex-col items-center justify-center">
        <img 
          src="/images/firstHomeImage.jpg" 
          alt="List A Sale" 
          className="h-full w-full object-cover absolute"
        />
        
        {/* Hero Text Section */}
        <div 
          className="absolute md:top-[5%] lg:top-[10%] xl:top-[10%] left-0 right-0 text-center text-white w-full max-w-full px-4" 
          style={{ fontFamily: 'var(--font-darkmode)' }}
        >
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-6xl lg:text-7xl xl:text-[6.667rem] font-bold">
              <span className="whitespace-nowrap">Let's find your next</span>
              <span className="mt-3 md:mt-6 lg:mt-8 xl:mt-10 block">hidden treasure</span>
            </div>
            
            <div 
              className="text-base md:text-2xl lg:text-3xl xl:text-[2.333rem] font-bold mt-6 md:w-[400px] lg:w-[550px] xl:w-[700px]"
              style={{ fontFamily: 'var(--font-rig-sans)' }}
            >
              <span>A smarter way to search for estate sales and vintage goods</span>
            </div>

            {/* Buttons Section */}
            <div className="flex gap-4 md:gap-6 lg:gap-7 xl:gap-8 flex-wrap justify-center mt-6 md:mt-8 lg:mt-10 xl:mt-12">
              <button 
                className="btn btn-primary btn-lg md:w-[160px] md:h-[40px] lg:w-[180px] lg:h-[45px] xl:w-[240px] xl:h-[55px] !text-sm md:!text-base lg:!text-lg xl:!text-[2rem] flex items-center justify-center !p-0" 
                style={{ 
                  fontFamily: 'var(--font-rig-sans)',
                  fontWeight: '700',
                  textAlign: 'center',
                  lineHeight: '1'
                }}
              >
                Find Sales
              </button>
              <button 
                className="btn btn-primary btn-lg md:w-[160px] md:h-[40px] lg:w-[180px] lg:h-[45px] xl:w-[240px] xl:h-[55px] !text-sm md:!text-base lg:!text-lg xl:!text-[2rem] flex items-center justify-center !p-0" 
                style={{ 
                  fontFamily: 'var(--font-rig-sans)',
                  fontWeight: '700',
                  textAlign: 'center',
                  lineHeight: '1'
                }}
              >
                Shop Online
              </button>
            </div>

            {/* Search Bar Section */}
            <div className="mt-6 md:mt-8 lg:mt-10 xl:mt-12 w-full md:w-4/5 lg:w-3/4 xl:w-2/3">
              <div className="input-group md:h-12 lg:h-14 xl:h-16">
                <input 
                  type="search" 
                  className="form-control rounded-none placeholder-gray-400 !text-sm md:!text-base lg:!text-lg xl:!text-[1.5rem]" 
                  placeholder="Find what you love: item, city, seller..." 
                  style={{ 
                    borderRadius: '0', 
                    fontFamily: 'var(--font-rig-sans)'
                  }}
                />
                <button 
                  className="btn btn-primary rounded-none" 
                  type="button"
                  style={{ 
                    backgroundColor: 'white',
                    color: '#1288e0', 
                    borderRadius: '0', 
                    border: 'none' 
                  }}
                >
                  <HiMagnifyingGlass 
                    className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-[#1288e0]" 
                    style={{ strokeWidth: '2' }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CategorySection />
      <NearYouSection />
      <ExploreAllButton href="/sales" />

      <ItemsNearYouSection />
      <ExploreAllButton href="/sales" />
      
      <PromotionalSection />

      {/* Hero Image 2 */}
      <div className="relative w-full h-[350px] lg:h-[400px] xl:h-[500px] overflow-hidden flex flex-col items-center justify-center">
        <img 
            src="/images/list-a-sale-estate-yard-garage-online-sell.jpg" 
            alt="List A Sale" 
            className="h-full w-full object-cover absolute"
            style={{ 
              filter: 'brightness(0.8)'
            }}
          />
        
        {/* Hero Text Section */}
        <div 
          className="absolute md:top-[5%] lg:top-[10%] xl:top-[10%] 2xl:top-[10%] left-0 right-0 text-center text-white w-full max-w-full px-4" 
          style={{ fontFamily: 'var(--font-darkmode)' }}
        >
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-[3.5rem] lg:text-7xl xl:text-[6.667rem] font-bold">
              <span className="whitespace-nowrap">Start Listing with Us Today</span>
            </div>
            
            <div 
              className="text-base md:text-2xl lg:text-3xl xl:text-[2.333rem] font-bold mt-6 md:w-[700px] lg:w-[900px] xl:w-[1350px]"
              style={{ fontFamily: 'var(--font-rig-sans)' }}
            >
              <span>List A Sale makes it easy for anyone to list sales or items and reach buyers who are actively searching. Post your listings and get discovered by people looking for great finds in your area.</span>
            </div>

            {/* Button Section */}
            <div className="flex gap-4 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10 flex-wrap justify-center mt-6 md:mt-8 lg:mt-10 xl:mt-12 2xl:mt-14">
              <button 
                className="btn btn-primary btn-lg md:w-[160px] md:h-[40px] lg:w-[180px] lg:h-[45px] xl:w-[240px] xl:h-[55px] !text-sm md:!text-base lg:!text-lg xl:!text-[2rem] flex items-center justify-center !p-0" 
                style={{ 
                  fontFamily: 'var(--font-rig-sans)',
                  fontWeight: '700',
                  textAlign: 'center',
                  lineHeight: '1'
                }}
              >
                Start Listing
              </button>
            </div>
          </div>
        </div>
      </div>

      <CarouselSection />
    </main>
  );
}
