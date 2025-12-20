export default function About() {
  const features = [
    { icon: "🤖", title: "AI Trading Bots", desc: "24/7 automated trading across 50+ crypto pairs" },
    { icon: "⚡", title: "Lightning Fast", desc: "Thousands of micro-trades executed daily" },
    { icon: "🔒", title: "100% Secure", desc: "Smart contract handles all transactions" },
    { icon: "💎", title: "Arbitrage Profits", desc: "Capitalize on price differences across exchanges" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">ABOUT SPEED ASIA</h2>
          <div className="accent-line"></div>
        </div>

        {/* Main About Content */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="card-gold p-8 md:p-10 border-4 border-gold-primary/40 hover:border-gold-primary text-center">
            <div className="text-6xl mb-4">🚀</div>
            <p className="text-white text-lg md:text-xl leading-relaxed">
              Speed Asia is an <span className="text-gold-primary font-black">innovative blockchain-based smart contract staking platform</span> powered by cutting-edge AI-driven crypto trading technology. Our platform pools user stakes into high-performance trading algorithms that operate 24/7 across global cryptocurrency markets.
            </p>
          </div>
        </div>

        {/* How We Generate Returns - Feature Grid */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-gold-primary mb-2">💰 How We Generate Returns</h3>
            <p className="text-gray-400">Our AI-powered trading ecosystem works for you</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-gold p-6 border-2 border-gold-primary/30 hover:border-gold-primary text-center transition-all hover:scale-105"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 className="text-gold-primary font-bold mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Trading Explanation Box */}
          <div className="card-gold p-8 border-4 border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-6xl">�</div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-xl font-black text-green-400 mb-3">Your Money Never Sleeps</h4>
                <p className="text-white text-lg leading-relaxed mb-3">
                  Your staked USDT is deployed into our <span className="text-gold-primary font-bold">proprietary AI trading ecosystem</span> that executes thousands of micro-trades daily across Bitcoin, Ethereum, and 50+ altcoin pairs.
                </p>
                <p className="text-gray-300">
                  With a proven track record of <span className="text-green-400 font-bold">consistent profitability</span>, our trading pools generate sustainable returns distributed directly through the smart contract. <span className="text-gold-primary font-bold">No delays, no hidden fees!</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="card-gold p-6 border-2 border-blue-500/30 hover:border-blue-500 transition-all">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎯</div>
              <div>
                <h4 className="text-lg font-bold text-blue-400 mb-2">Our Mission</h4>
                <p className="text-gray-300">
                  Democratize access to institutional-grade crypto trading strategies. Earn passive income <span className="text-gold-primary font-bold">without trading knowledge</span> through our automated staking rewards and smart referral system.
                </p>
              </div>
            </div>
          </div>

          <div className="card-gold p-6 border-2 border-purple-500/30 hover:border-purple-500 transition-all">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🌍</div>
              <div>
                <h4 className="text-lg font-bold text-purple-400 mb-2">Global Community</h4>
                <p className="text-gray-300">
                  Join <span className="text-gold-primary font-bold">thousands of users worldwide</span> who are already earning passive income. Build a long-term community powered by transparency, AI innovation, and financial independence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
