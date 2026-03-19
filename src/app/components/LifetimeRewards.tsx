export default function LifetimeRewards() {
  const rewards = [
    { tier: 1, direct: "5", team: "30", business: "$10K", reward: "$200", icon: "🥉", color: "from-amber-700/30", border: "border-amber-700/50" },
    { tier: 2, direct: "10", team: "100", business: "$40K", reward: "$750", icon: "🥈", color: "from-gray-400/20", border: "border-gray-400/50" },
    { tier: 3, direct: "15", team: "200", business: "$110K", reward: "$2,500", icon: "🥇", color: "from-yellow-500/20", border: "border-yellow-500/50" },
    { tier: 4, direct: "15", team: "500", business: "$210K", reward: "$5,000", icon: "💎", color: "from-cyan-500/20", border: "border-cyan-500/50" },
    { tier: 5, direct: "20", team: "600", business: "$410K", reward: "$15,000", icon: "👑", color: "from-purple-500/20", border: "border-purple-500/50" },
    { tier: 6, direct: "20", team: "2000", business: "$810K", reward: "$25,000", icon: "🏆", color: "from-gold-primary/30", border: "border-gold-primary" },
  ];

  return (
    <section id="lifetime-rewards" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-gold-dark via-black to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-primary text-sm font-bold uppercase tracking-wider">Exclusive Bonuses</span>
          <h2 className="section-heading mt-2">LIFETIME REWARDS</h2>
          <div className="accent-line"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Achieve milestones and unlock massive one-time cash rewards up to $25,000!</p>
          <div className="mt-6 max-w-3xl mx-auto p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-2xl">⚖️</span>
              <h3 className="text-lg font-bold text-purple-400">Leg Matching System</h3>
            </div>
            <p className="text-sm text-gray-300 text-center">
              <span className="font-bold text-white">50-50 Balance Required:</span> Your <span className="text-gold-primary font-bold">strongest leg (A)</span> and <span className="text-blue-400 font-bold">other legs combined (B)</span> must each reach <span className="font-bold">50% of the target business volume</span> to claim rewards.
            </p>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {rewards.map((item, index) => (
            <div
              key={index}
              className={`card-gold p-6 border-4 ${item.border} transition-all group bg-gradient-to-br ${item.color} to-transparent hover:scale-105 relative overflow-hidden`}
            >
              {/* Tier Badge */}
              <div className="absolute top-4 right-4">
                <div className="text-4xl">{item.icon}</div>
              </div>

              {/* Tier Number */}
              <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-2">Tier {item.tier}</div>

              {/* Reward Amount - Hero */}
              <div className="mb-6">
                <div className="text-5xl font-black text-white group-hover:text-gold-primary transition-colors">
                  {item.reward}
                </div>
                <div className="text-sm text-gold-primary font-bold mt-1">Cash Reward</div>
              </div>

              {/* Requirements */}
              <div className="space-y-3 p-4 bg-black/40 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-sm">👤</div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">Direct Referrals</div>
                    <div className="text-white font-bold">{item.direct}+</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-sm">👥</div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">Team Size</div>
                    <div className="text-white font-bold">{item.team}+</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-sm">💰</div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">Team Business</div>
                    <div className="text-white font-bold">{item.business}+</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-700/50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs">⚖️</span>
                    <div className="text-xs text-purple-400 font-bold">Leg Matching</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span className="text-gold-primary">Strongest Leg</span> + <span className="text-blue-400">Other Legs</span> ≥ 50% each
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leg Matching Explanation */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="card-gold p-6 border-2 border-purple-500/40 bg-gradient-to-br from-purple-500/10 to-transparent">
            <h3 className="text-xl font-black text-purple-400 mb-4 text-center">How Leg Matching Works</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-black/40 rounded-lg border border-gold-primary/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🏆</span>
                  <div className="text-sm font-bold text-gold-primary">Strongest Leg (A)</div>
                </div>
                <p className="text-xs text-gray-400">Your highest performing direct referral's total team business</p>
              </div>
              <div className="p-4 bg-black/40 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">👥</span>
                  <div className="text-sm font-bold text-blue-400">Other Legs (B)</div>
                </div>
                <p className="text-xs text-gray-400">Combined business from all your other direct referrals</p>
              </div>
            </div>
            <div className="p-4 bg-gold-primary/10 rounded-lg border border-gold-primary/30">
              <p className="text-sm text-center text-gray-300">
                <span className="font-bold text-white">Example:</span> For Tier 1 ($10K target), you need <span className="text-gold-primary font-bold">Leg A ≥ $5K</span> AND <span className="text-blue-400 font-bold">Leg B ≥ $5K</span> to claim the $200 reward!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-gold-primary/10 to-transparent rounded-full border border-gold-primary/30">
            <span className="text-3xl">🚀</span>
            <div className="text-left">
              <div className="text-gold-primary font-bold">Total Rewards Pool</div>
              <div className="text-white text-2xl font-black">$48,450+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
