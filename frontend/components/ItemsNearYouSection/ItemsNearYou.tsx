'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HiStar } from 'react-icons/hi2';

interface Item {
  id: number;
  title: string;
  image: string;
  photoCount: number;
  label: 'local' | 'shipping';
  location: string;
  price: string;
  timeLeft: string;
  href: string;
}

export default function ItemsNearYouSection() {
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

  const items: Item[] = [
    {
      id: 1,
      title: 'Vintage Yellow Car',
      image: '/images/cat1.jpg',
      photoCount: 5,
      label: 'local',
      location: 'Manhattan, NY',
      price: '$5,000',
      timeLeft: '30d left',
      href: '#'
    },
    {
      id: 2,
      title: 'Sexy Guitar',
      image: '/images/cat2.jpg',
      photoCount: 5,
      label: 'shipping',
      location: 'Manhattan, NY',
      price: '$242',
      timeLeft: '21h 06m left',
      href: '#'
    },
    {
      id: 3,
      title: 'Absolutely Your Mamma\'s Couch',
      image: '/images/cat3.jpg',
      photoCount: 5,
      label: 'local',
      location: 'Manhattan, NY',
      price: '$75',
      timeLeft: '42m 09s left',
      href: '#'
    },
    {
      id: 4,
      title: 'Gorgeous Antique Brass & Porcelain Decorative...',
      image: '/images/cat4.jpg',
      photoCount: 5,
      label: 'shipping',
      location: 'Manhattan, NY',
      price: '$152',
      timeLeft: '06m 42s left',
      href: '#'
    },
    {
      id: 5,
      title: 'Vintage Yellow Car',
      image: '/images/cat1.jpg',
      photoCount: 5,
      label: 'local',
      location: 'Manhattan, NY',
      price: '$5,000',
      timeLeft: '30d left',
      href: '#'
    },
    {
      id: 6,
      title: 'Sexy Guitar',
      image: '/images/cat2.jpg',
      photoCount: 5,
      label: 'shipping',
      location: 'Manhattan, NY',
      price: '$242',
      timeLeft: '21h 06m left',
      href: '#'
    },
    {
      id: 7,
      title: 'Absolutely Your Mamma\'s Couch',
      image: '/images/cat3.jpg',
      photoCount: 5,
      label: 'local',
      location: 'Manhattan, NY',
      price: '$75',
      timeLeft: '42m 09s left',
      href: '#'
    },
    {
      id: 8,
      title: 'Gorgeous Antique Brass & Porcelain Decorative...',
      image: '/images/cat4.jpg',
      photoCount: 5,
      label: 'shipping',
      location: 'Manhattan, NY',
      price: '$152',
      timeLeft: '06m 42s left',
      href: '#'
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-9 lg:px-9 md:mb-10 xl:mb-20">
      {/* Section Title */}
      <div className="flex">
        <span 
          className="md:text-xl lg:text-2xl xl:text-3xl font-bold mb-10 md:mb-12"
          style={{ fontFamily: 'var(--font-darkmode)', color: '#693073' }}
        >
          Items Near You
        </span>
      </div>

      {/* Items Grid */}
      <div className="flex flex-wrap md:gap-6">
        {items.map((item) => {
          const isFavorite = favorites.has(item.id);
          return (
            <Link
              key={item.id}
              href={item.href}
              className="bg-white hover:shadow-lg transition-shadow flex flex-col relative item-card"
              style={{ 
                textDecoration: 'none', 
                color: 'black',
                border: '1px solid #d1d5db'
              }}
            >
              {/* Image Container */}
              <div className="relative w-full md:p-2">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                
              {/* Favorite Button */}
              <button
                  onClick={(e) => toggleFavorite(e, item.id)}
                  className="absolute top-4 right-4 z-10 bg-white hover:shadow-lg transition-shadow flex items-center justify-center"
                  style={{ 
                    cursor: 'pointer',
                    borderRadius: '50%',
                    border: '1px solid #d1d5db',
                    padding: 0,
                    width: '2rem',
                    height: '2rem'
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

                {/* Label Overlay */}
                <div 
                  className="absolute bottom-1 right-1 flex items-center gap-1 px-2 py-1"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    color: item.label === 'local' ? '#693073' : '#1288e0',
                  }}
                >
                  <img 
                    src={item.label === 'local' ? '/images/pickUp.png' : '/images/delivery.png'} 
                    alt={item.label === 'local' ? 'Pick Up' : 'Delivery'}
                    className="w-5 h-5"
                  />
                  <span 
                    className="md:text-base lg:text-[1.167rem] xl:text-[1.333rem] 2xl:text-3xl"
                  style={{ 
                    fontFamily: 'var(--font-rig-sans)', 
                    fontWeight: '700' 
                    }}>
                    {item.label === 'local' ? 'Local Pick Up Only' : 'Shipping Available'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 md:px-2">
                
                {/* Title */}
                <span 
                  className="md:text-[1.167rem] lg:text-[1.333rem] xl:text-2xl 2xl:text-3xl font-bold"
                  style={{ 
                    fontFamily: 'var(--font-rig-sans)',
                  }}
                >
                  {item.title}
                </span>

                {/* Location */}
                <p 
                  className="md:mb-2 md:text-[1.167rem] lg:text-[1.333rem] xl:text-2xl 2xl:text-3xl font-regular"
                  style={{ 
                    fontFamily: 'var(--font-rig-sans)',
                    color: 'gray'
                  }}
                >
                  {item.location}
                </p>

                {/* Price and Time Left */}
                <div className="flex items-baseline justify-between md:pt-4 mt-auto">
                  <span className='md:text-[1.667rem] lg:text-[1.833rem] xl:text-[2rem] 2xl:text-3xl font-bold'
                    style={{ 
                      fontFamily: 'var(--font-rig-sans)',
                    }}
                  >
                    {item.price}
                  </span>
                  <span className="md:text-[1.167rem] lg:text-[1.333rem] xl:text-2xl 2xl:text-3xl font-regular"
                    style={{ 
                      fontFamily: 'var(--font-rig-sans)',
                    }}
                  >
                    {item.timeLeft}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

    </section>
  );
}

