export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" style={{ background: 'radial-gradient(circle at center, #1a1508 0%, #000000 100%)' }}>
      {/* Animated Background Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gold-primary/20 rounded-full blur-[150px] animate-pulse-gold"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gold-secondary/10 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gold-primary/10 rounded-full blur-[120px] animate-float delay-500"></div>
        {/* Floating Icons */}
        <div className="absolute top-20 left-10 text-4xl opacity-20 animate-float">💰</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>📈</div>
        <div className="absolute bottom-40 left-20 text-4xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>⚡</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>🚀</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Live Badge */}
        <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-green-400 text-sm font-bold">LIVE ON BNB CHAIN</span>
        </div>

        {/* Animated Badge */}
        <div className="inline-block mb-8 px-8 py-3 border-4 border-gold-primary rounded-full bg-gold-primary/20 backdrop-blur-sm glow-gold-strong animate-fade-in-up">
          <span className="text-gold-primary text-base font-black tracking-[0.3em] uppercase animate-shimmer">
            🤖 AI-Powered Trading + Staking 🤖
          </span>
        </div>

        {/* Massive Animated Heading */}
        <div className="relative mb-6">
          {/* Decorative Lines */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-4 flex items-center gap-4">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent to-gold-primary rounded-full"></div>
            <span className="text-gold-primary text-2xl">✦</span>
            <div className="w-20 h-1 bg-gradient-to-l from-transparent to-gold-primary rounded-full"></div>
          </div>

          <h1 className="text-7xl sm:text-8xl md:text-[10rem] font-black uppercase leading-none tracking-tight animate-fade-in-up delay-200 relative">
            <span
              className="block relative"
              style={{
                background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 40%, #CC8800 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextStroke: '2px rgba(255, 215, 0, 0.3)',
                filter: 'drop-shadow(0 4px 0 #8B6914) drop-shadow(0 8px 0 #5C4710) drop-shadow(0 20px 40px rgba(255, 215, 0, 0.5))'
              }}
            >
              SPEED
            </span>
            <span
              className="block relative -mt-4 md:-mt-8"
              style={{
                background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 40%, #CC8800 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextStroke: '2px rgba(255, 215, 0, 0.3)',
                filter: 'drop-shadow(0 4px 0 #8B6914) drop-shadow(0 8px 0 #5C4710) drop-shadow(0 20px 40px rgba(255, 215, 0, 0.5))'
              }}
            >
              ASIA
            </span>
          </h1>

          {/* Decorative Lines Bottom */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-2 flex items-center gap-4">
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent to-gold-primary/50 rounded-full"></div>
            <span className="text-gold-primary/50 text-xl">◆</span>
            <div className="w-32 h-0.5 bg-gradient-to-l from-transparent to-gold-primary/50 rounded-full"></div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-lg text-gray-400 mb-4 uppercase tracking-widest font-bold">Your Gateway to Passive Crypto Income</p>

        {/* Animated Description */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto font-bold leading-relaxed animate-fade-in-up delay-300">
          Earn up to <span className="text-green-400 font-black">25% Returns</span> through{' '}
          <span className="text-gold-primary font-black">Smart Contract Staking</span>
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center gap-2 px-4 py-2 bg-black/50 rounded-full border border-gold-primary/30">
            <span className="text-lg">🔒</span>
            <span className="text-gray-300 text-sm font-bold">100% Secure</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-black/50 rounded-full border border-gold-primary/30">
            <span className="text-lg">⚡</span>
            <span className="text-gray-300 text-sm font-bold">Instant Payouts</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-black/50 rounded-full border border-gold-primary/30">
            <span className="text-lg">🤖</span>
            <span className="text-gray-300 text-sm font-bold">AI Trading</span>
          </div>
        </div>

        {/* Animated CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up delay-400">
          <a href="/register" className="group relative px-10 py-5 font-black text-lg uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 overflow-hidden" style={{
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
            color: '#000000',
            boxShadow: '0 10px 40px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.3)',
            border: '3px solid #FFD700'
          }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10">🚀 Start Earning Now</span>
          </a>

          <a href="#staking-income" className="group px-10 py-5 font-black text-lg uppercase tracking-wider rounded-xl border-4 border-gold-primary bg-transparent text-gold-primary hover:bg-gold-primary/20 transition-all duration-300 hover:scale-110 hover:-translate-y-2" style={{
            boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)'
          }}>
            📊 View Staking Plans
          </a>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto animate-fade-in-up delay-500">
          {[
            { label: 'Max Returns', value: '25%', icon: '💰', color: 'text-green-400' },
            { label: 'Referral Bonus', value: '3%', icon: '👥', color: 'text-blue-400' },
            { label: 'Level Income', value: '20 Levels', icon: '📈', color: 'text-purple-400' },
            { label: 'Lifetime Rewards', value: '$25K+', icon: '🏆', color: 'text-gold-primary' }
          ].map((stat, index) => (
            <div key={index} className="card-gold p-5 border-2 border-gold-primary/30 hover:border-gold-primary transition-all hover:scale-105">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-2xl md:text-3xl font-black ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-xs text-gray-400 uppercase font-bold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm mb-2">Trusted by thousands of investors worldwide</p>
          <div className="flex justify-center items-center gap-1">
            {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-gold-primary">⭐</span>)}
            <span className="text-gray-400 text-sm ml-2">4.9/5 Rating</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-500 text-xs uppercase tracking-wider">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-gold-primary/50 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-gold-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
