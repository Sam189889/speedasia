export default function Benefits() {
  const benefits = [
    {
      title: "100% Blockchain-Based",
      desc: "Every transaction is recorded on-chain, fully transparent and verifiable",
      icon: "🔗",
      color: "from-blue-500/20 to-blue-600/10",
      border: "border-blue-500/30 hover:border-blue-400"
    },
    {
      title: "Automated Rewards",
      desc: "Smart contracts distribute earnings instantly without delays",
      icon: "⚡",
      color: "from-yellow-500/20 to-yellow-600/10",
      border: "border-yellow-500/30 hover:border-yellow-400"
    },
    {
      title: "Fully Decentralized",
      desc: "No admin control over your funds - 100% trustworthy system",
      icon: "🛡️",
      color: "from-green-500/20 to-green-600/10",
      border: "border-green-500/30 hover:border-green-400"
    },
    {
      title: "Instant Payouts",
      desc: "Withdraw your earnings anytime directly to your wallet",
      icon: "💰",
      color: "from-gold-primary/20 to-gold-secondary/10",
      border: "border-gold-primary/30 hover:border-gold-primary"
    },
    {
      title: "Zero Maintenance",
      desc: "Set it and forget it - earn passive income effortlessly",
      icon: "✨",
      color: "from-purple-500/20 to-purple-600/10",
      border: "border-purple-500/30 hover:border-purple-400"
    },
    {
      title: "24/7 Operations",
      desc: "AI trading bots work round the clock for maximum returns",
      icon: "🤖",
      color: "from-cyan-500/20 to-cyan-600/10",
      border: "border-cyan-500/30 hover:border-cyan-400"
    },
  ];

  return (
    <section id="benefits" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">BENEFITS OF SPEED ASIA</h2>
          <div className="accent-line"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Why thousands of users trust us with their investments</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`card-gold p-6 border-2 ${benefit.border} transition-all group bg-gradient-to-br ${benefit.color} hover:scale-105`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="text-5xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2">
                    {benefit.title}
                  </h3>
                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
