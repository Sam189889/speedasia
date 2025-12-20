export default function StakingPackages() {
  const packages = [
    { amount: "$5", label: "Fixed", icon: "🌱", name: "Starter", color: "from-green-500/20", border: "border-green-500/40", features: ["Up to 25% Returns", "Instant Withdrawals"] },
    { amount: "$10", label: "Fixed", icon: "📊", name: "Basic", color: "from-blue-500/20", border: "border-blue-500/40", features: ["Up to 25% Returns", "Instant Withdrawals"] },
    { amount: "$20 - $5,000", label: "Flexible", icon: "👑", name: "Premium", color: "from-gold-primary/20", border: "border-gold-primary", popular: true, features: ["Up to 25% Returns", "Instant Withdrawals", "Direct Income Eligible", "Level Income Eligible"] },
  ];

  return (
    <section id="packages" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-primary text-sm font-bold uppercase tracking-wider">Flexible Investment Options</span>
          <h2 className="section-heading mt-2">STAKING PACKAGES</h2>
          <div className="accent-line"></div>
          <p className="text-gray-400 mt-4">Choose your investment size and start earning today</p>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`card-gold p-8 border-4 ${pkg.border} transition-all hover:scale-105 bg-gradient-to-br ${pkg.color} to-transparent relative overflow-hidden text-center`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gold-primary text-black text-xs font-bold px-4 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}

              <div className="text-5xl mb-4">{pkg.icon}</div>
              <h3 className="text-xl font-black text-white mb-2">{pkg.name}</h3>
              <div className="text-xs text-gray-500 uppercase mb-4">{pkg.label} Amount</div>

              <div className="p-4 bg-black/40 rounded-xl mb-6">
                <div className="text-gold-primary font-black text-3xl">{pkg.amount}</div>
              </div>

              <div className="space-y-2 text-sm">
                {pkg.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-center justify-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="max-w-3xl mx-auto card-gold p-6 border-2 border-gold-primary/30 bg-gradient-to-r from-gold-primary/10 to-transparent mb-8">
          <div className="flex items-center gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h4 className="text-gold-primary font-bold mb-1">Pro Tip</h4>
              <p className="text-gray-300 text-sm">
                Stake <span className="text-gold-primary font-bold">$20 or more</span> to unlock direct referral income and level income for maximum earning potential!
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
