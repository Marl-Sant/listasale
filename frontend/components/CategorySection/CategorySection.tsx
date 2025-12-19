'use client';

import Link from 'next/link';

interface Category {
  id: number;
  title: string;
  image: string;
  href: string;
}

export default function CategorySection() {
  
  const categories: Category[] = [
    { id: 1, title: 'Antiques & Collectibles', image: '/images/cat1.jpg', href: "#" },
    { id: 2, title: 'Home Goods & Decor', image: '/images/cat2.jpg', href: "#" },
    { id: 3, title: 'Clothing & Accessories', image: '/images/cat3.jpg', href: "#" },
    { id: 4, title: 'Jewelry & Watches', image: '/images/cat4.jpg', href: "#" },
    { id: 5, title: 'Furniture & Lighting', image: '/images/cat5.jpg', href: "#" },
    { id: 6, title: 'Sports & Hobbies', image: '/images/cat6.jpg', href: "#" },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:mb-10 xl:mb-20">
      
      {/* Shop By Category Title */}
      <div className="flex justify-center">
        <span 
            className="md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-10 md:mb-12"
            style={{ 
              fontFamily: 'var(--font-darkmode)', 
              textAlign: 'center', 
              color: '#693073' 
            }}
            >
            Shop By Category
        </span>
      </div>
      
      {/* Shop By Category Items */}
      <div className="flex flex-wrap justify-center md:gap-7 lg:gap-10 xl:gap-15">
        {categories.map((category) => (
          <Link 
            key={category.id}
            href={category.href}
            className="flex flex-col items-center w-[13%]"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <div className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity w-full">
              <img 
                src={category.image} 
                alt={category.title} 
                className="w-full h-full object-cover rounded-full" 
              />
            </div>
            <span 
              className="font-semibold md:text-xl lg:text- xl:text-2xl mt-4 text-center"
              style={{ fontFamily: 'var(--font-rig-sans)' }}
            >
              {category.title}
            </span>
          </Link>
        ))}
      </div>

    </section>
  );
}