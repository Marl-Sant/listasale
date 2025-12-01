'use client';

import Link from 'next/link';

interface NearYouItem {
  id: number;
  title: string;
  image: string;
  subImages?: string[];
  location?: string;
  date?: string;
  href: string;
}

export default function NearYouSection() {
  
  const nearYouItems: NearYouItem[] = [
    {
      id: 1,
      title: 'Estate Sale Title',
      image: '/images/cat1.jpg',
      subImages: ['/images/cat1.jpg', '/images/cat2.jpg', '/images/cat3.jpg', '/images/cat4.jpg', '/images/cat5.jpg'],
      location: 'City, State',
      date: 'March 15-17, 2024',
      href: '#'
    },
    {
      id: 2,
      title: 'Estate Sale Title',
      image: '/images/cat2.jpg',
      subImages: ['/images/cat1.jpg', '/images/cat2.jpg', '/images/cat3.jpg', '/images/cat4.jpg', '/images/cat5.jpg'],
      location: 'City, State',
      date: 'March 20-22, 2024',
      href: '#'
    },
    {
      id: 3,
      title: 'Estate Sale Title',
      image: '/images/cat3.jpg',
      subImages: ['/images/cat1.jpg', '/images/cat2.jpg', '/images/cat3.jpg', '/images/cat4.jpg', '/images/cat5.jpg'],
      location: 'City, State',
      date: 'March 25-27, 2024',
      href: '#'
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto md:px-6 lg:px-8 py-12">
      
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
      {nearYouItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="bg-white hover:shadow-lg transition-shadow flex"
            style={{ 
              textDecoration: 'none', 
              color: 'black',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Left Section - Main Image */}
            <div className="relative flex items-center py-4">
              <img 
                src={item.image} 
                alt={item.title} 
                className="object-cover"
                style={{ width: '20rem', height: '20rem', marginLeft: '1.5rem' }}
              />
            </div>
            
            {/* Right Section - Content */}
            <div className="flex-1 flex flex-col p-4 md:p-6">
              
              {/* Title */}
              <h3 
                className="text-xl md:text-2xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-darkmode)' }}
              >
                {item.title}
              </h3>
              
              {/* Location and Date */}
              <div className="space-y-2">
                {item.location && (
                  <p 
                    className="text-sm md:text-base"
                    style={{ fontFamily: 'var(--font-rig-sans)' }}
                  >
                    📍 {item.location}
                  </p>
                )}
                
                {item.date && (
                  <p 
                    className="text-sm md:text-base"
                    style={{ fontFamily: 'var(--font-rig-sans)' }}
                  >
                    📅 {item.date}
                  </p>
                )}
              </div>

              {/* Sub Images */}
              {item.subImages && item.subImages.length > 0 && (
                <div className="flex gap-1 p-1 mb-4">
                  {item.subImages.slice(0, 5).map((subImage, index) => (
                    <div key={index} className="relative overflow-hidden">
                      <img 
                        src={subImage} 
                        alt={`${item.title} - Image ${index + 1}`} 
                        className="object-cover"
                        style={{ width: '10rem', height: '10rem' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}