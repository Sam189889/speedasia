export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" style={{ background: 'radial-gradient(circle at center, #1a1508 0%, #000000 100%)' }}>
      {/* Animated Background Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gold-primary/20 rounded-full blur-[150px] animate-pulse-gold"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gold-secondary/10 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gold-primary/10 rounded-full blur-[120px] animate-float delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Badge */}
        <div className="inline-block mb-8 px-8 py-3 border-4 border-gold-primary rounded-full bg-gold-primary/20 backdrop-blur-sm glow-gold-strong animate-fade-in-up">
          <span className="text-gold-primary text-base font-black tracking-[0.3em] uppercase animate-shimmer">
            ⚡ Blockchain Staking Platform ⚡
          </span>
        </div>

        {/* Massive Animated Heading */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-black mb-8 uppercase leading-none tracking-tighter animate-fade-in-up delay-200" style={{
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 30%, #FFD700 60%, #FF8C00 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 80px rgba(255, 215, 0, 0.8)',
          filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.6))'
        }}>
          SPEED<br />ASIA
        </h1>

        {/* Animated Description */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto font-bold leading-relaxed animate-fade-in-up delay-300">
          Earn <span className="text-gold-primary font-black">Passive Income</span> through{' '}
          <span className="text-gold-primary font-black">Smart Contract Staking</span>
        </p>

        {/* Animated CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up delay-400">
          <a href="/register" className="group relative px-10 py-5 font-black text-lg uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 overflow-hidden" style={{
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
            color: '#000000',
            boxShadow: '0 10px 40px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.3)',
            border: '3px solid #FFD700'
          }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10">🚀 Start Staking Now</span>
          </a>

          <a href="#packages" className="group px-10 py-5 font-black text-lg uppercase tracking-wider rounded-xl border-4 border-gold-primary bg-transparent text-gold-primary hover:bg-gold-primary/20 transition-all duration-300 hover:scale-110 hover:-translate-y-2" style={{
            boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)'
          }}>
            📊 View Plans
          </a>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto animate-fade-in-up delay-500">
          {[
            { label: 'Total Staked', value: '$2.5M+', icon: '💰' },
            { label: 'Active Users', value: '1,247+', icon: '👥' },
            { label: 'Daily Rewards', value: '$50K+', icon: '📈' },
            { label: 'Success Rate', value: '99.9%', icon: '⭐' }
          ].map((stat, index) => (
            <div key={index} className={`card-gold p-6 hover-lift animate-scale-in delay-${(index + 6) * 100}`}>
              <div className="text-4xl mb-2 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-black text-gold-primary mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-400 uppercase font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold-primary rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-gold-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
