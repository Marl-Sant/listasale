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
    <section className="max-w-[1440px] mx-auto md:px-9 lg:px-9">
      {/* Section Title */}
      <div className="flex md:mb-8">
        <span 
          className="md:text-xl lg:text-2xl xl:text-3xl font-bold"
          style={{ fontFamily: 'var(--font-darkmode)', color: '#693073' }}
        >
          Items Near You
        </span>
      </div>

      {/* Items Grid */}
      <div className="flex flex-wrap md:gap-6 justify-center">
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
                    className="w-4 h-4"
                  />
                  <span style={{ fontFamily: 'var(--font-rig-sans)', fontWeight: '700' }}>
                    {item.label === 'local' ? 'Local Pick Up Only' : 'Shipping Available'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 md:px-2">
                
                {/* Title */}
                <h3 
                  className="md:mb-0"
                  style={{ 
                    fontFamily: 'var(--font-rig-sans)',
                    fontWeight: '700',
                    fontSize: '18pt'
                  }}
                >
                  {item.title}
                </h3>

                {/* Location */}
                <p 
                  className="md:mb-2"
                  style={{ 
                    fontFamily: 'var(--font-rig-sans)',
                    fontWeight: '400',
                    fontSize: '18pt',
                    color: 'gray'
                  }}
                >
                  {item.location}
                </p>

                {/* Price and Time Left */}
                <div className="flex items-baseline justify-between md:pt-4 mt-auto">
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-rig-sans)',
                      fontWeight: '700',
                      fontSize: '24pt'
                    }}
                  >
                    {item.price}
                  </span>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-rig-sans)',
                      fontWeight: '400',
                      fontSize: '16pt'
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

      {/* Explore All Button */}
      <div className="flex justify-center md:mt-12">
        <button 
          type="button" 
          className="btn btn-primary btn-lg md:w-[160px] lg:w-[180px] xl:w-[200px]" 
          style={{ 
            fontFamily: 'var(--font-rig-sans)' ,
            fontSize: '18px'
          }}
        >
          Explore All
        </button>
      </div>
    </section>
  );
}

