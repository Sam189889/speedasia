export default function StakingPackages() {
  return (
    <section id="packages" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-primary text-sm font-bold uppercase tracking-wider">Flexible Staking System</span>
          <h2 className="section-heading mt-2">PROGRESSIVE STAKING</h2>
          <div className="accent-line"></div>
          <p className="text-gray-400 mt-4">Stake any amount from $20 to $5,000 and grow progressively</p>
        </div>

        {/* Main Staking Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="card-gold p-8 md:p-12 border-4 border-gold-primary bg-gradient-to-br from-gold-primary/20 to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gold-primary text-black text-xs font-bold px-4 py-1 rounded-bl-lg">
              FLEXIBLE
            </div>

            <div className="text-center mb-8">
              <div className="text-6xl mb-4">💎</div>
              <h3 className="text-gold-primary font-black text-4xl mb-3">$20 - $5,000</h3>
              <p className="text-gray-300 text-lg">
                Start with any amount and <span className="text-gold-primary font-bold">progressively increase</span> your stake over time
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-black/50 rounded-xl border border-gold-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📊</span>
                  <span className="text-white font-bold">Daily 1% ROI</span>
                </div>
                <p className="text-gray-400 text-sm">Earn consistent daily returns</p>
              </div>
              <div className="p-4 bg-black/50 rounded-xl border border-gold-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🚀</span>
                  <span className="text-white font-bold">Speed Eligible</span>
                </div>
                <p className="text-gray-400 text-sm">Qualify for 1.5% daily ROI</p>
              </div>
              <div className="p-4 bg-black/50 rounded-xl border border-gold-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📈</span>
                  <span className="text-white font-bold">Level Income</span>
                </div>
                <p className="text-gray-400 text-sm">Earn from 20 levels deep</p>
              </div>
              <div className="p-4 bg-black/50 rounded-xl border border-gold-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🏆</span>
                  <span className="text-white font-bold">Lifetime Rewards</span>
                </div>
                <p className="text-gray-400 text-sm">Unlock milestone bonuses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progressive Staking Info */}
        <div className="max-w-3xl mx-auto card-gold p-6 border-2 border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-transparent mb-8">
          <div className="flex items-center gap-4">
            <div className="text-4xl">📊</div>
            <div>
              <h4 className="text-purple-400 font-bold mb-1">Progressive Staking</h4>
              <p className="text-gray-300 text-sm">
                Each new stake must be <span className="text-gold-primary font-bold">equal or higher</span> than your previous stake. 
                Build your capital <span className="text-green-400 font-bold">progressively</span> over time!
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-10 py-5 font-black text-lg uppercase rounded-xl transition-all duration-300 hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              color: '#000',
              boxShadow: '0 10px 40px rgba(255, 215, 0, 0.4)'
            }}
          >
            🚀 Start Staking Now
          </a>
        </div>
      </div>
    </section>
  );
}
