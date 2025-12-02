'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HiStar, HiCamera } from 'react-icons/hi2';

interface NearYouItem {
  id: number;
  title: string;
  owner: string;
  image: string;
  photoCount: number;
  subImages?: string[];
  location?: string;
  date?: {
    dayOfWeek: string;
    time: string;
    month: string;
    dates: number[];
  };
  href: string;
}

export default function NearYouSection() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  
  const toggleFavorite = (e: React.MouseEvent, itemId: number) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };
  
  const nearYouItems: NearYouItem[] = [
    {
      id: 1,
      title: 'Variety of Eclectic Collectibles',
      owner: 'Ellyn Estate Sales',
      image: '/images/cat1.jpg',
      photoCount: 5,
      subImages: ['/images/cat1.jpg', '/images/cat2.jpg', '/images/cat3.jpg', '/images/cat4.jpg', '/images/cat5.jpg'],
      location: 'City, State',
      date: {
        dayOfWeek: 'Friday',
        time: '8am',
        month: 'Nov',
        dates: [21, 22, 24]
      },
      href: '#'
    },
    {
      id: 2,
      title: 'Variety of Eclectic Collectibles',
      owner: 'Ellyn Estate Sales',
      image: '/images/cat2.jpg',
      photoCount: 5,
      subImages: ['/images/cat1.jpg', '/images/cat2.jpg', '/images/cat3.jpg', '/images/cat4.jpg', '/images/cat5.jpg'],
      location: 'City, State',
      date: {
        dayOfWeek: 'Saturday',
        time: '9am',
        month: 'Dec',
        dates: [15, 16]
      },
      href: '#'
    },
    {
      id: 3,
      title: 'Variety of Eclectic Collectibles',  
      owner: 'Ellyn Estate Sales',
      image: '/images/cat3.jpg',
      photoCount: 5,
      subImages: ['/images/cat1.jpg', '/images/cat2.jpg', '/images/cat3.jpg', '/images/cat4.jpg', '/images/cat5.jpg'],
      location: 'City, State',
      date: {
        dayOfWeek: 'Friday',
        time: '8pm',
        month: 'Jan',
        dates: [10, 11, 12, 13]
      },
      href: '#'
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-5 md:px-9 lg:px-9 py-12">
  
      {/* Near You Title */}
      <div className="flex">
        <span 
          className="md:text-1xl lg:text-2xl xl:text-3xl mb-8"
          style={{ fontFamily: 'var(--font-darkmode)', color: '#693073' }}
        >
          Sales Near You
        </span>
      </div>
      
      {/* Near You Items */}
      <div className="flex flex-col gap-6 md:gap-8">
      {nearYouItems.map((item) => {
        const isFavorite = favorites.has(item.id);
        return (
          <Link
            key={item.id}
            href={item.href}
            className="bg-white hover:shadow-lg transition-shadow flex relative overflow-hidden"
            style={{ 
              textDecoration: 'none', 
              color: 'black',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Favorite Button */}
            <button
              onClick={(e) => toggleFavorite(e, item.id)}
              className="absolute top-4 z-10 w-10 h-10 bg-white hover:shadow-lg transition-shadow flex items-center justify-center"
              style={{ 
                cursor: 'pointer',
                right: '1rem',
                top: '1rem',
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                border: '1px solid #d1d5db',
                padding: 0
              }}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <HiStar 
                className="w-5 h-5"
                style={{
                  fill: isFavorite ? '#ffe600' : 'white',
                  color: isFavorite ? '#ffe600' : 'white',
                  stroke: 'black',
                  strokeWidth: '1',
                  shapeRendering: 'crispEdges'
                }}
              />
            </button>

            {/* Main Image */}
            <div className="relative flex items-center py-4 min-w-0 flex-shrink-0">
              <div 
                className="relative overflow-hidden md:w-55 lg:w-80 xl:w-90" 
                style={{ marginLeft: '1.5rem', aspectRatio: '22/16' }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Photo Count Overlay */}
                <div 
                  className="absolute bottom-0 right-0 flex items-center gap-1 px-2 py-1"
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    color: 'white',
                    fontSize: '0.75rem',
                    shapeRendering: 'crispEdges'
                  }}
                >
                  <HiCamera className="w-4 h-4" />
                  <span>{item.photoCount}</span>
                </div>
              </div>
            </div>
            
            {/* Right Section */}
            <div className="flex-1 flex flex-col md:p-4 lg:p-5 xl:p-6">
              
              {/* Title */}
              <span 
                className="md:text-lg lg:text-xl xl:text-2xl font-bold"
                style={{ fontFamily: 'var(--font-rig-sans)' }}
              >
                {item.title}
              </span>
              
              {/* Owner*/}
              <div>
                {item.owner && (
                  <p 
                    className="md:text-sm lg:text-base xl:text-lg font-bold mb-1"
                    style={{ 
                      fontFamily: 'var(--font-rig-sans)',
                      color: 'gray'
                    }}
                  >
                   by {item.owner}
                  </p>
                )}
                
                {/* Location and Date */}
                <div className="flex flex-wrap gap-3 md:gap-4 items-center">
                  {item.location && (
                    <div className="flex items-center gap-1">
                      <img 
                        src="/images/location.png" 
                        alt="Location" 
                        className="md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-4 xl:h-4 self-center" 
                        style={{ shapeRendering: 'crispEdges' }}
                      />
                      <p 
                        className="md:text-sm lg:text-base xl:text-lg m-0 leading-none"
                        style={{ 
                          fontFamily: 'var(--font-rig-sans)',
                          color: '#1288e0'
                        }}
                      >
                        {item.location}
                      </p>
                    </div>
                  )}
                  
                  {item.date && (
                    <div className="flex items-center gap-1">
                      <img 
                        src="/images/date.png" 
                        alt="Calendar" 
                        className="md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-4 xl:h-4 self-center" 
                        style={{ shapeRendering: 'crispEdges' }}
                      />
                      <p 
                        className="md:text-sm lg:text-base xl:text-lg m-0 leading-none"
                        style={{ 
                          fontFamily: 'var(--font-rig-sans)',
                          color: '#692073'
                        }}
                      >
                        Starts {item.date.dayOfWeek} at {item.date.time} - {item.date.month} {item.date.dates.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sub Images */}
              {item.subImages && item.subImages.length > 0 && (
                <div className="flex justify-between gap-1 md:mt-3 lg:mt-16 xl:mt-auto overflow-x-auto">
                  {item.subImages.slice(0, 5).map((subImage, index) => {
                    const getDisplayClasses = () => {
                      if (index < 3) return '';
                      if (index === 3) return 'hidden lg:block';
                      if (index === 4) return 'hidden xl:block';
                      return 'hidden';
                    };
                    
                    return (
                      <div 
                        key={index} 
                        className={`relative overflow-hidden md:w-29 lg:w-30 xl:w-40 ${getDisplayClasses()}`}
                        style={{ aspectRatio: '10.5/8.5' }}
                      >
                        <img 
                          src={subImage} 
                          alt={`${item.title} - Image ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Link>
        );
      })}
      </div>
    </section>
  );
};