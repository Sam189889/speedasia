export default function StakingIncome() {
  const features = [
    { icon: "📊", title: "Daily 1% ROI", desc: "Consistent daily returns on your stake" },
    { icon: "⏰", title: "Claim Anytime", desc: "Withdraw your daily earnings 24/7" },
    { icon: "🔄", title: "Compound Option", desc: "Reinvest profits to grow faster" },
    { icon: "🔓", title: "Unstake Anytime", desc: "Get your capital back when needed" },
  ];

  return (
    <section id="staking-income" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">DAILY ROI SYSTEM</h2>
          <div className="accent-line"></div>
          <p className="text-gray-400 mt-4">Earn consistent daily returns with full flexibility</p>
        </div>

        {/* Main ROI Card */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="card-gold p-8 md:p-12 border-4 border-gold-primary hover:border-gold-primary/60 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold-primary to-gold-secondary flex items-center justify-center shadow-[0_0_60px_rgba(255,215,0,0.4)]">
                <span className="text-black font-black text-5xl">1%</span>
              </div>
              
              <h3 className="text-gold-primary font-black text-4xl mb-3">Daily Returns</h3>
              <p className="text-gray-300 text-lg mb-8">
                Earn <span className="text-gold-primary font-bold">1% per day</span> on your staked amount.
                With Speed active, earn up to <span className="text-green-400 font-bold">1.5% daily</span>!
              </p>

              {/* Example Calculation */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 bg-black/50 rounded-xl border border-gold-primary/20">
                  <div className="text-gray-400 text-sm mb-1">$100 Stake</div>
                  <div className="text-green-400 font-bold text-xl">$1/day</div>
                </div>
                <div className="p-4 bg-black/50 rounded-xl border border-gold-primary/20">
                  <div className="text-gray-400 text-sm mb-1">$1,000 Stake</div>
                  <div className="text-green-400 font-bold text-xl">$10/day</div>
                </div>
                <div className="p-4 bg-black/50 rounded-xl border border-gold-primary/20">
                  <div className="text-gray-400 text-sm mb-1">$5,000 Stake</div>
                  <div className="text-green-400 font-bold text-xl">$50/day</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="card-gold p-6 border-2 border-gold-primary/40 hover:border-gold-primary transition-all hover:scale-105 text-center"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h4 className="text-white font-bold text-lg mb-2">{feature.title}</h4>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Note Card */}
        <div className="max-w-3xl mx-auto card-gold p-6 border-2 border-green-500/30 bg-gradient-to-r from-green-500/10 to-transparent">
          <div className="flex items-center gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h3 className="text-green-400 font-bold text-lg mb-1">Full Control!</h3>
              <p className="text-gray-300">
                <span className="text-gold-primary font-bold">Claim daily</span>, <span className="text-blue-400 font-bold">compound</span> to grow, or <span className="text-purple-400 font-bold">unstake</span> anytime. Your money, your choice!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
