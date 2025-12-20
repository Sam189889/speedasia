export default function LevelIncome() {
  const levels = [
    { level: "1", percent: "10", icon: "🔥", color: "from-red-500/30", highlight: true },
    { level: "2", percent: "8", icon: "⚡", color: "from-orange-500/30", highlight: true },
    { level: "3", percent: "5", icon: "💎", color: "from-yellow-500/30", highlight: true },
    { level: "4", percent: "3", icon: "🌟", color: "from-green-500/20" },
    { level: "5", percent: "2", icon: "✨", color: "from-blue-500/20" },
    { level: "6", percent: "1", icon: "💫", color: "from-purple-500/20" },
    { level: "7-20", percent: "0.5", icon: "⭐", color: "from-gray-500/20", isRange: true },
  ];

  const totalPercent = 10 + 8 + 5 + 3 + 2 + 1 + (0.5 * 14); // Levels 1-6 + (7-20)

  return (
    <section id="level-income" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-primary text-sm font-bold uppercase tracking-wider">Earn From Your Team</span>
          <h2 className="section-heading mt-2">20 LEVEL INCOME</h2>
          <div className="accent-line"></div>
          <div className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-blue-500/10 border-2 border-blue-500/50 rounded-full">
            <span className="text-2xl">📌</span>
            <span className="text-blue-400 font-bold">Earn commission on team's ROI earnings</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Level Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
            {levels.map((lvl, idx) => (
              <div
                key={idx}
                className={`card-gold p-4 border-2 ${lvl.highlight ? 'border-gold-primary' : 'border-gold-primary/30'} transition-all group bg-gradient-to-br ${lvl.color} to-transparent hover:scale-105 text-center relative`}
              >
                {lvl.highlight && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gold-primary rounded-full flex items-center justify-center">
                    <span className="text-xs">🔥</span>
                  </div>
                )}
                <div className="text-2xl mb-2">{lvl.icon}</div>
                <div className="text-xs text-gray-500 uppercase mb-1">Level</div>
                <div className="text-white font-bold text-lg mb-2">{lvl.level}</div>
                <div className={`text-2xl font-black ${lvl.highlight ? 'text-gold-primary' : 'text-white'}`}>
                  {lvl.percent}%
                </div>
                {lvl.isRange && (
                  <div className="text-xs text-gray-500 mt-1">each level</div>
                )}
              </div>
            ))}
          </div>

          {/* Total Earning Potential */}
          <div className="card-gold p-6 border-4 border-gold-primary bg-gradient-to-r from-gold-primary/20 to-transparent mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-5xl">💰</div>
                <div>
                  <div className="text-gray-400 text-sm">Total Earning Potential</div>
                  <div className="text-gold-primary font-black text-3xl">{totalPercent}% Combined</div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-gray-400 text-sm">Across All Levels</div>
                <div className="text-white font-bold text-xl">20 Levels Deep</div>
              </div>
            </div>
          </div>

          {/* How to Unlock */}
          <div className="card-gold p-6 border-2 border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-transparent">
            <h3 className="text-purple-400 font-black text-lg uppercase mb-4 flex items-center gap-2">
              <span className="text-2xl">🔓</span> How to Unlock Levels
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-black/40 rounded-xl border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">1️⃣</div>
                  <div>
                    <div className="text-white font-bold mb-1">Per Referral Method</div>
                    <div className="text-gray-400 text-sm">Each $20+ direct referral unlocks 1 level</div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-black/40 rounded-xl border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">2️⃣</div>
                  <div>
                    <div className="text-white font-bold mb-1">Business Volume Method</div>
                    <div className="text-gray-400 text-sm">$2,000 total direct business = All 20 levels</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
