'use client';

interface Category {
  id: number;
  title: string;
  image: string;
}

export default function CategorySection() {
  
  const categories: Category[] = [
    { id: 1, title: 'Antiques & Collectibles', image: '/images/cat1.jpg' },
    { id: 2, title: 'Home Goods & Decor', image: '/images/cat2.jpg' },
    { id: 3, title: 'Clothing & Accessories', image: '/images/cat3.jpg' },
    { id: 4, title: 'Jewelry & Watches', image: '/images/cat4.jpg' },
    { id: 5, title: 'Furniture & Lighting', image: '/images/cat5.jpg' },
    { id: 6, title: 'Sports & Hobbies', image: '/images/cat6.jpg' },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-12">
      
      {/* Shop By Category Title */}
      <div className="flex justify-center">
        <span 
            className="text-xl md:text-1xl lg:text-2xl xl:text-3xl font-bold mb-8"
            style={{ fontFamily: 'var(--font-darkmode)', textAlign: 'center', color: '#693073' }}
            >
            Shop By Category
        </span>
      </div>
      
      {/* Shop By Category Items */}
      <div className="flex flex-wrap justify-center xl:gap-10 md:gap-6">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="flex flex-col items-center w-[13%]"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity w-full">
              <img 
                src={category.image} 
                alt={category.title} 
                className="w-full h-full object-cover rounded-full" 
              />
            </div>
            <span 
              className="font-semibold md:text-xl lg:text-1xl xl:text-2xl mt-4 text-center"
              style={{ fontFamily: 'var(--font-rig-sans)' }}
            >
              {category.title}</span>
          </div>
        ))}
      </div>

    </section>
  );
}