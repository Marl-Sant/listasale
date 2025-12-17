'use client';

import { useSelector } from 'react-redux';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import type { RootState } from '../store/store';
import CategorySection from '../components/CategorySection/CategorySection';
import NearYouSection from '../components/SalesNearYouSection/SalesNearYou';
import ItemsNearYouSection from '../components/ItemsNearYouSection/ItemsNearYou';
import PromotionalSection from '../components/PromotionalSection/PromotionalSection';
import CarouselSection from '../components/CarouselSection/CarouselSection';
import StripeTestButton from '@/components/StripeTestButton/StripeTestButton';
import StripeSubTestButton from '@/components/StripeSubTestButton/StripeSubTestButton';


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
        
        <div 
          className="absolute md:top-[10%] lg:top-[14%] xl:top-[17%] left-0 right-0 text-center text-white text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-bold w-full max-w-full px-4" 
          style={{ fontFamily: 'var(--font-darkmode)' }}
        >
          <div className="flex flex-col">
            <span className="whitespace-nowrap">Let's find your next</span>
            <span className="mt-3 md:mt-6 lg:mt-8">hidden treasure</span>
          </div> </div>

        <div 
          className="absolute md:top-[44%] lg:top-[45%] xl:top-[46%] left-0 right-0 text-center text-white text-base md:text-2xl lg:text-3xl xl:text-4xl font-bold w-full max-w-full px-4"
          style={{ fontFamily: 'var(--font-rig-sans)' }}
        >
          <span>A smarter way to search for<br /> estate sales and vintage goods</span>
        </div>

        <div className="absolute md:top-[62%] lg:top-[60%] xl:top-[58%] left-0 right-0 flex gap-4 md:gap-6 lg:gap-7 xl:gap-15 flex-wrap justify-center w-full max-w-full px-4">
          <button 
            className="btn btn-primary btn-lg md:min-w-[130px] lg:min-w-[150px] xl:min-w-[180px]" 
            style={{ 
              fontFamily: 'var(--font-rig-sans)'}}
          >
            Find Sales
          </button>
          <button 
            className="btn btn-primary btn-lg md:min-w-[130px] lg:min-w-[150px] xl:min-w-[180px]" 
            style={{ fontFamily: 'var(--font-rig-sans)' }}
          >
            Shop Online
          </button>
        </div>

        {/* Search Bar */}
        <div className="input-group absolute h-12 md:top-[34%] lg:top-[26%] xl:top-[22%] max-w-md md:max-w-lg lg:max-w-xl xl:max-w-4xl mx-auto">
          <input 
            type="search" 
            className="form-control rounded-none placeholder-gray-400" 
            placeholder="Find what you love: item, city, seller..." 
            style={{ borderRadius: '0', fontFamily: 'var(--font-rig-sans)' }}
          />
          <button 
            className="btn btn-primary rounded-none" 
            type="button"
            style={{ backgroundColor: 'white', color: '#1288e0', borderRadius: '0', border: 'none' }}
          >
            <HiMagnifyingGlass 
              className="w-5 h-5 text-[#1288e0]" 
              style={{ strokeWidth: '2' }}
            />
          </button>
        </div>

      </div>

      <CategorySection />
      <NearYouSection />
      <ItemsNearYouSection />
      <PromotionalSection />

      {/* Hero Image 2 */}
      <div className="relative w-full aspect-video overflow-hidden flex flex-col items-center justify-center md:-mt-20 lg:-mt-30 xl:-mt-40">
        <img 
            src="/images/list-a-sale-estate-yard-garage-online-sell.jpg" 
            alt="List A Sale" 
            className="h-full w-full object-cover absolute inset-0"
            style={{ 
              clipPath: 'inset(20% 0 19% 0)',
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
                <br />looking for great finds in your area.</span>
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
