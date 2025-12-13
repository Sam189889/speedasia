import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b-4 border-gold-primary" style={{
      background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(26,21,8,0.95) 100%)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Speed Asia Logo"
              width={240}
              height={80}
              className="h-16 w-auto"
              priority
              unoptimized
            />
          </div>

          {/* Dashboard Button */}
          <a
            href="/dashboard"
            className="relative px-6 py-2.5 font-black text-sm uppercase tracking-[0.12em] rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 group overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
              color: '#000000',
              boxShadow: '0 4px 30px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.2)',
              border: '2px solid #FFD700'
            }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

            <span className="relative z-10">DASHBOARD</span>
          </a>
        </div>
      </div>
    </header>
  );
}


