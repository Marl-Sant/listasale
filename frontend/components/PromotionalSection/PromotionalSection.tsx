'use client';

export default function PromotionalSection() {
  return (
    <section className="max-w-[1440px] mx-auto md:px-9 lg:px-9 xl:mb-25 xl:mt-20">
      <div className="md:flex md:flex-row md:gap-6">
        {/* Left Side */}
        <div className="flex-1 md:flex md:flex-row bg-[#693073] md:rounded-l-3xl overflow-hidden promotional-card">
          
          {/* Left Text */}
          <div className="flex-1 flex flex-col justify-center md:p-5 lg:p-8 xl:p-12 text-white promotional-text">
            <span 
              className="md:mb-2 lg:mb-4 xl:mb-6 font-bold promotional-title md:text-lg lg:text-xl xl:text-2xl"
              style={{ 
                fontFamily: 'var(--font-rig-sans)',
                fontWeight: '600'
              }}
            >
              Join Our List and Stay In the Loop
            </span>
            <p 
              className="md:mb-2 lg:mb-4 xl:mb-6 promotional-body md:text-sm lg:text-base xl:text-lg"
              style={{ 
                fontFamily: 'var(--font-rig-sans)',
                fontWeight: '400'
              }}
            >
              Sign up to get alerts for new estate sales, online deals, and hidden local finds. We'll send you updates so you never miss something special. Your next great discovery might be one email away.
            </p>
            <button
              className="btn btn-primary text-white border-none hover:bg-[#0f7bc7] transition-colors py-2 promotional-button"
              style={{ 
                fontFamily: 'var(--font-rig-sans)',
                fontWeight: '600'
              }}
            >
              Sign Up Now
            </button>
          </div>
          
          {/* Left Image */}
          <div className="flex-1 relative">
            <img 
              src="/images/oldies2.jpg" 
              alt="Join our list" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 md:flex md:flex-row bg-[#002861] md:rounded-r-3xl overflow-hidden promotional-card">
         
          {/* Right Image */}
          <div className="flex-1 relative">
            <img 
              src="/images/oldies.jpg" 
              alt="Hire a professional" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Right Text */}
          <div className="flex-1 flex flex-col justify-center md:p-5 lg:p-8 xl:p-12 text-white promotional-text">
            <span 
              className="md:mb-2 lg:mb-4 xl:mb-6 font-bold promotional-title md:text-lg lg:text-xl xl:text-2xl"
              style={{ 
                fontFamily: 'var(--font-rig-sans)',
                fontWeight: '600',
              }}
            >
              Hire a Trusted Estate Sale Professional
            </span>
            <p 
              className="md:mb-2 lg:mb-4 xl:mb-6 promotional-body md:text-sm lg:text-base xl:text-lg"
              style={{ 
                fontFamily: 'var(--font-rig-sans)',
                fontWeight: '400'
              }}
            >
              Whether you're downsizing, handling an inheritance, or moving, a professional can make the process far easier. We'll match you with reliable estate sale companies who manage every detail for you.
            </p>
            <button
              className="btn btn-primary text-white border-none hover:bg-[#0c8fc7] transition-colors py-2 promotional-button"
              style={{ 
                fontFamily: 'var(--font-rig-sans)',
                fontWeight: '600',
              }}
            >
              Hire a Pro
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}