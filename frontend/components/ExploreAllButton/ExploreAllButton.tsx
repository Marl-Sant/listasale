'use client';

import Link from 'next/link';

interface ExploreAllButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function ExploreAllButton({ 
  href = '#', 
  onClick,
  className = '' 
}: ExploreAllButtonProps) {
  const buttonClasses = `btn btn-primary btn-lg md:w-[160px] lg:w-[180px] xl:w-[200px] ${className}`;
  const buttonStyle = {
    fontFamily: 'var(--font-rig-sans)',
    fontSize: '18px'
  };

  const buttonContent = (
    <button 
      type="button" 
      className={buttonClasses}
      style={buttonStyle}
      onClick={onClick}
    >
      Explore All
    </button>
  );

  if (href && !onClick) {
    return (
      <div className="flex justify-center mt-10 md:mt-12 mb-10 md:mb-12">
        <Link href={href} style={{ textDecoration: 'none' }}>
          {buttonContent}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10 md:mt-12 mb-10 md:mb-12">
      {buttonContent}
    </div>
  );
}