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
          className=" h-full w-full object-cover absolute"
        />
        
        {/* Hero Text Section */}
        <div 
          className="absolute md:top-[5%] lg:top-[10%] xl:top-[10%] 2xl:top-[10%] left-0 right-0 text-center text-white w-full max-w-full px-4" 
          style={{ fontFamily: 'var(--font-darkmode)' }}
        >
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-6xl lg:text-7xl xl:text-[6.667rem] 2xl:text-[7.5rem] font-bold">
              <span className="whitespace-nowrap">Let's find your next</span>
              <span className="mt-3 md:mt-6 lg:mt-8 xl:mt-10 2xl:mt-12 block">hidden treasure</span>
            </div>
            
            <div 
              className="text-base md:text-2xl lg:text-3xl xl:text-[2.333rem] 2xl:text-[2.667rem] font-bold mt-6 md:w-[400px] lg:w-[550px] xl:w-[700px] 2xl:w-[800px]"
              style={{ fontFamily: 'var(--font-rig-sans)' }}
            >
              <span>A smarter way to search for estate sales and vintage goods</span>
            </div>

            {/* Buttons Section */}
            <div className="flex gap-4 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10 flex-wrap justify-center mt-6 md:mt-8 lg:mt-10 xl:mt-12 2xl:mt-14">
              <button 
                className="btn btn-primary btn-lg md:w-[160px] md:h-[40px] lg:w-[180px] lg:h-[45px] xl:w-[240px] xl:h-[55px] 2xl:w-[280px] 2xl:h-[60px] !text-sm md:!text-base lg:!text-lg xl:!text-[2rem] 2xl:!text-[2.25rem] flex items-center justify-center !p-0" 
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
                className="btn btn-primary btn-lg md:w-[160px] md:h-[40px] lg:w-[180px] lg:h-[45px] xl:w-[240px] xl:h-[55px] 2xl:w-[280px] 2xl:h-[60px] !text-sm md:!text-base lg:!text-lg xl:!text-[2rem] 2xl:!text-[2.25rem] flex items-center justify-center !p-0" 
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
            <div className="mt-6 md:mt-8 lg:mt-10 xl:mt-12 2xl:mt-14 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-3/5">
              <div className="input-group md:h-12 lg:h-14 xl:h-16 2xl:h-18">
                <input 
                  type="search" 
                  className="form-control rounded-none placeholder-gray-400 !text-sm md:!text-base lg:!text-lg xl:!text-[1.5rem] 2xl:!text-[1.75rem]" 
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
                    className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 text-[#1288e0]" 
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
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden flex flex-col items-center justify-center xl:mb-20">
        <img 
            src="/images/list-a-sale-estate-yard-garage-online-sell.jpg" 
            alt="List A Sale" 
            className="h-full w-full object-cover absolute inset-0"
            style={{ 
              filter: 'brightness(0.8)'
            }}
          />
        
        <div 
          className="absolute md:top-[30%] lg:top-[30%] xl:top-[30%] left-0 right-0 text-center text-white md:text-5xl lg:text-7xl xl:text-8xl font-bold w-full max-w-full px-4" 
          style={{ fontFamily: 'var(--font-darkmode)' }}
        >
          <div className="flex flex-col">
            <span className="whitespace-nowrap">Start Listing with Us Today</span>
          </div>
          
        </div>

        <div 
          className="absolute md:top-[44%] lg:top-[45%] xl:top-[46%] left-0 right-0 text-center text-white md:text-xl lg:text-2xl xl:text-4xl font-bold w-full max-w-full px-4"
          style={{ fontFamily: 'var(--font-rig-sans)' }}
        >
          <span>List A Sale makes it easy for anyone to list sales or items and reach buyers
                <br />who are actively searching. Post your listings and get discovered by people 
                <br />looking for great finds in your area.
          </span>
        </div>

        <div className="absolute md:top-[65%] lg:top-[65%] xl:top-[65%] left-0 right-0 flex gap-4 md:gap-6 lg:gap-7 xl:gap-15 flex-wrap justify-center w-full max-w-full px-4">
          <button 
            className="btn btn-primary btn-lg md:min-w-[130px] lg:min-w-[150px] xl:min-w-[180px]" 
            style={{ 
              fontFamily: 'var(--font-rig-sans)'}}
          >
            Start Listing
          </button>
        </div>
      </div>

      <CarouselSection />
    </main>
  );
}
