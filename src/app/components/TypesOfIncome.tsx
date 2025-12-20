export default function TypesOfIncome() {
  const incomes = [
    {
      title: "STAKING INCOME",
      icon: "📊",
      desc: "Earn up to 25% returns on your staked USDT",
      highlight: "Up to 25%",
      color: "from-green-500/20",
      border: "border-green-500/40 hover:border-green-400"
    },
    {
      title: "DIRECT INCOME",
      icon: "🎯",
      desc: "Get 3% instant bonus on direct referrals",
      highlight: "3% Instant",
      color: "from-blue-500/20",
      border: "border-blue-500/40 hover:border-blue-400"
    },
    {
      title: "LEVEL INCOME",
      icon: "📈",
      desc: "Earn from 20 levels of your downline team",
      highlight: "20 Levels",
      color: "from-purple-500/20",
      border: "border-purple-500/40 hover:border-purple-400"
    },
    {
      title: "LIFETIME REWARDS",
      icon: "🏆",
      desc: "Unlock exclusive rewards up to $100,000",
      highlight: "$100K Max",
      color: "from-gold-primary/20",
      border: "border-gold-primary/40 hover:border-gold-primary"
    },
  ];

  return (
    <section id="income" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-gold-dark via-black to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">4 WAYS TO EARN</h2>
          <div className="accent-line"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Multiple income streams to maximize your earnings</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {incomes.map((item, index) => (
            <div
              key={index}
              className={`card-gold p-6 border-2 ${item.border} transition-all group bg-gradient-to-br ${item.color} to-transparent hover:scale-105 text-center relative overflow-hidden`}
            >
              {/* Badge */}
              <div className="absolute top-3 right-3 px-2 py-1 bg-white/10 rounded-full">
                <span className="text-xs font-bold text-gold-primary">{item.highlight}</span>
              </div>

              {/* Icon */}
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-black text-white mb-2">{item.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-black transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' }}
          >
            Start Earning Now 🚀
          </a>
        </div>
      </div>
    </section>
  );
}
