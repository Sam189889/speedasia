export default function StakingIncome() {
  const stakingPlans = [
    { days: "7", interest: "3", icon: "🌱", label: "Starter" },
    { days: "14", interest: "7", icon: "📈", label: "Growth" },
    { days: "21", interest: "16", icon: "🚀", label: "Pro" },
    { days: "30", interest: "25", icon: "👑", label: "Premium" },
  ];

  return (
    <section id="staking-income" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">STAKING PLANS</h2>
          <div className="accent-line"></div>
          <p className="text-gray-400 mt-4">Choose your plan and start earning guaranteed returns</p>
        </div>

        {/* Staking Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {stakingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`card-gold p-6 border-4 ${idx === 3 ? 'border-gold-primary bg-gradient-to-br from-gold-primary/20 to-transparent' : 'border-gold-primary/40'} hover:border-gold-primary transition-all group text-center hover:scale-105`}
            >
              {/* Badge */}
              {idx === 3 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold-primary rounded-full">
                  <span className="text-xs font-bold text-black">BEST VALUE</span>
                </div>
              )}

              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{plan.icon}</div>

              {/* Label */}
              <div className="text-gray-400 text-sm uppercase mb-2">{plan.label}</div>

              {/* Days */}
              <div className="text-white font-bold text-2xl mb-2">{plan.days} Days</div>

              {/* Interest */}
              <div className="text-4xl font-black text-gold-primary mb-4">{plan.interest}%</div>

              {/* Calculate example */}
              <div className="p-3 bg-black/50 rounded-lg border border-gold-primary/20">
                <div className="text-xs text-gray-400">$100 → </div>
                <div className="text-green-400 font-bold">${100 + parseInt(plan.interest)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Note Card */}
        <div className="max-w-3xl mx-auto card-gold p-6 border-2 border-green-500/30 bg-gradient-to-r from-green-500/10 to-transparent">
          <div className="flex items-center gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h3 className="text-green-400 font-bold text-lg mb-1">Assured Returns!</h3>
              <p className="text-gray-300">
                Your <span className="text-gold-primary font-bold">principal + profit</span> are automatically credited to your wallet upon completion. No claiming needed!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
