'use client';

export default function BottomNav() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe" style={{
      background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.98) 100%)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 215, 0, 0.2)',
      boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.5)'
    }}>
      <div className="flex justify-around items-center h-16 sm:h-18 md:h-20 px-2 sm:px-4 max-w-7xl mx-auto">
        {/* Home */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex flex-col items-center justify-center gap-1 py-2 px-2 sm:px-4 min-w-[60px] sm:min-w-[70px] transition-all hover:scale-110 active:scale-95"
        >
          <div className="relative">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-gold-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-primary scale-x-0 group-hover:scale-x-100 transition-transform"></div>
          </div>
          <span className="text-[9px] sm:text-[10px] text-gray-400 group-hover:text-gold-primary font-medium transition-colors">Home</span>
        </a>

        {/* Plans */}
        <a
          href="#packages"
          onClick={(e) => handleNavClick(e, '#packages')}
          className="group flex flex-col items-center justify-center gap-1 py-2 px-2 sm:px-4 min-w-[60px] sm:min-w-[70px] transition-all hover:scale-110 active:scale-95"
        >
          <div className="relative">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-gold-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-primary scale-x-0 group-hover:scale-x-100 transition-transform"></div>
          </div>
          <span className="text-[9px] sm:text-[10px] text-gray-400 group-hover:text-gold-primary font-medium transition-colors">Plans</span>
        </a>

        {/* Income - Center with highlight */}
        <a
          href="#income"
          onClick={(e) => handleNavClick(e, '#income')}
          className="group flex flex-col items-center justify-center gap-1 py-2 px-2 sm:px-4 min-w-[60px] sm:min-w-[70px] transition-all hover:scale-110 active:scale-95 -mt-4 sm:-mt-6"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center relative group-hover:scale-110 transition-transform" style={{
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            boxShadow: '0 4px 25px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3)'
          }}>
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full bg-gold-primary animate-ping opacity-20"></div>
          </div>
          <span className="text-[9px] sm:text-[10px] text-gold-primary font-bold">Income</span>
        </a>

        {/* Calc */}
        <a
          href="#staking-income"
          onClick={(e) => handleNavClick(e, '#staking-income')}
          className="group flex flex-col items-center justify-center gap-1 py-2 px-2 sm:px-4 min-w-[60px] sm:min-w-[70px] transition-all hover:scale-110 active:scale-95"
        >
          <div className="relative">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-gold-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-primary scale-x-0 group-hover:scale-x-100 transition-transform"></div>
          </div>
          <span className="text-[9px] sm:text-[10px] text-gray-400 group-hover:text-gold-primary font-medium transition-colors">Calc</span>
        </a>
      </div>
    </nav>
  );
}
