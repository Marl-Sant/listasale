'use client';

export default function PromotionalSection() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 md:mb-10 lg:mb-12 xl:mb-20 mt-20">
      <div className="md:flex md:flex-row md:items-stretch md:gap-4 lg:gap-6">
        {/* Left Side */}
        <div className="flex-1 md:flex md:flex-row bg-[#693073] md:rounded-l-3xl overflow-hidden ">
          
          {/* Left Text */}
          <div className="w-1/2 flex flex-col justify-center md:p-[28px] lg:p-[28px] xl:p-[28px] text-white">
            <span 
              className="md:mb-3 lg:mb-4 xl:mb-6 md:text-[1.25rem] lg:text-[1.375rem] xl:text-[1.5rem]"
              style={{ 
                fontFamily: 'var(--font-rig-sans)',
                fontWeight: '700'
              }}
            >
              Join Our List and Stay in the Loop
            </span>
            <p 
              className="md:mb-4 lg:mb-5 xl:mb-6 md:text-[0.9375rem] lg:text-[1.0625rem] xl:text-[1.125rem]"
              style={{ 
                fontFamily: 'var(--font-rig-sans)',
                fontWeight: '400'
              }}
            >
              Sign up to get alerts for new estate sales, online deals, and hidden local finds. We'll send you updates so you never miss something special. Your next great discovery might be one email away.
            </p>
            <div className="flex justify-center mt-4">
              <button
                className="btn btn-primary text-white !font-bold border-none hover:bg-[#0f7bc7] transition-colors md:!text-[1.25rem] lg:!text-[1.375rem] xl:!text-[1.5rem] flex items-center justify-center py-3 md:w-[150px] lg:w-[170px] xl:w-[270px]"
                style={{ 
                  fontFamily: 'var(--font-rig-sans)',
                  textAlign: 'center',
                  lineHeight: '1'
                }}
                >
                Sign Up Now
              </button>
            </div>
          </div>
          
          {/* Left Image */}
          <div className="w-1/2 relative h-full">
            <img 
              src="/images/oldies2.jpg" 
              alt="Join our list" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 md:flex md:flex-row bg-[#002861] md:rounded-r-3xl overflow-hidden">
         
          {/* Right Image */}
          <div className="w-1/2 relative h-full">
            <img 
              src="/images/oldies.jpg" 
              alt="Hire a professional" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Right Text */}
          <div className="w-1/2 flex flex-col justify-center md:p-[28px] lg:p-[28px] xl:p-[28px] text-white">
            <span 
              className="md:mb-3 lg:mb-4 xl:mb-6 md:text-[1.25rem] lg:text-[1.375rem] xl:text-[1.5rem]"
              style={{ 
                fontFamily: 'var(--font-rig-sans)',
                fontWeight: '700'
              }}
            >
              Hire a Trusted Estate Sale Professional
            </span>
            <p 
              className="md:mb-4 lg:mb-5 xl:mb-6 md:text-[0.9375rem] lg:text-[1.0625rem] xl:text-[1.125rem]"
              style={{ 
                fontFamily: 'var(--font-rig-sans)',
                fontWeight: '400'
              }}
            >
              Whether you're downsizing, handling an inheritance, or moving, a professional can make the process far easier. We'll match you with reliable estate sale companies who manage every detail for you.
            </p>
            <div className="flex justify-center mt-4">
              <button
              className="btn btn-primary text-white !font-bold border-none hover:bg-[#0c8fc7] transition-colors md:!text-[1.25rem] lg:!text-[1.375rem] xl:!text-[1.5rem] flex items-center justify-center py-3 md:w-[150px] lg:w-[170px] xl:w-[270px]"
              style={{ 
                fontFamily: 'var(--font-rig-sans)',
                textAlign: 'center',
                lineHeight: '1'
              }}
              >
              Hire a Pro
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}