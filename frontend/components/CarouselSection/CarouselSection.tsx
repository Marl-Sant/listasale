'use client';

import { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

interface CarouselSlide {
  image: string;
  heading: string;
  description: string;
}

export default function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: CarouselSlide[] = [
    {
      image: '/images/carousel1.jpg',
      heading: 'New to Estate Sales?',
      description: "Whether you're searching for vintage furniture, rare collectibles, or household goods, knowing what to expect helps you find what you love and get the best deals."
    },
    {
      image: '/images/oldies.jpg',
      heading: 'Discover Hidden Treasures',
      description: 'Explore unique finds from estate sales, garage sales, and online listings. Each item tells a story and could be your next great discovery.'
    },
    {
      image: '/images/oldies2.jpg',
      heading: 'Shop Smart, Save More',
      description: 'Find the best deals on quality items. Our platform connects you with sellers offering everything from antiques to everyday essentials at unbeatable prices.'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 9000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 9000);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 9000);
  };

  // Auto-Scroll 
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 9000); // Change slide every 9 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 md:mb-10 lg:mb-12 xl:mb-20 mt-20">
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
        
        {/* Background Image */}
        <img 
          src={currentSlide.image} 
          alt={currentSlide.heading}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#002861] to-transparent"
        />

        {/* Text Overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 lg:px-12 pb-8 md:pb-12 lg:pb-16">
          <div className="md:w-[600px] lg:w-[900px] xl:w-[1200px] mx-auto text-center">
            <h2 
              className="text-white md:!text-5xl lg:!text-[3.167rem] xl:!text-[3.333rem] font-bold mb-3 md:mb-4 lg:mb-6"
              style={{ 
                fontFamily: 'var(--font-darkmode)' 
              }}
            >
              {currentSlide.heading}
            </h2>
            <p 
              className="text-white md:text-base lg:text-xl xl:text-[2rem] mb-4 md:mb-6"
              style={{ 
                fontFamily: 'var(--font-rig-sans)' 
              }}
            >
              {currentSlide.description}
            </p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-10 hover:bg-gray-500 transition-colors md:p-3"
          aria-label="Previous slide"
        >
          <HiChevronLeft 
            className="md:w-15 md:h-15 lg:w-20 lg:h-20" 
            style={{ 
              strokeWidth: '2', 
              stroke: 'white' 
            }}
          />
        </button>

        <button
          onClick={nextSlide}
          className="absolute md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-10 hover:bg-gray-500 transition-colors md:p-3"
          aria-label="Next slide"
        >
          <HiChevronRight 
            className="md:w-15 md:h-15 lg:w-20 lg:h-20" 
            style={{ 
              strokeWidth: '2',
               stroke: 'white' 
              }}
          />
        </button>

        {/* Indicator Dots */}
        <div className="absolute md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentIndex 
                  ? 'md:w-10 lg:w-12 h-1 bg-white' 
                  : 'md:w-8 lg:w-10 h-1 bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}