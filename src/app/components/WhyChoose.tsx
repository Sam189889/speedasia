export default function WhyChoose() {
  const reasons = [
    {
      title: "🔐 Secure Transactions",
      desc: "Military-grade encryption protects every transaction on the blockchain",
      stat: "100%",
      statLabel: "Secure"
    },
    {
      title: "⚡ Smart Referrals",
      desc: "Automated referral system tracks and distributes rewards instantly",
      stat: "24/7",
      statLabel: "Active"
    },
    {
      title: "💰 Fast Withdrawals",
      desc: "Get your funds within minutes, not days. No waiting periods",
      stat: "<5min",
      statLabel: "Average"
    },
    {
      title: "🔗 Fully Decentralized",
      desc: "No admin can freeze, block, or control your funds. You're in charge",
      stat: "0%",
      statLabel: "Admin Control"
    }
  ];

  return (
    <section id="why-choose" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-gold-dark via-black to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">WHY CHOOSE SPEED ASIA?</h2>
          <div className="accent-line"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Built for security, speed, and complete transparency</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="card-gold p-6 border-2 border-gold-primary/30 hover:border-gold-primary transition-all group bg-gradient-to-br from-gold-primary/5 to-transparent hover:from-gold-primary/10 text-center"
            >
              {/* Stat Circle */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-primary to-gold-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="text-center">
                  <div className="text-black font-black text-xl leading-none">{reason.stat}</div>
                  <div className="text-black/70 text-[10px] font-bold">{reason.statLabel}</div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        <div className="mt-12 card-gold p-6 border-2 border-green-500/30 bg-gradient-to-r from-green-500/10 to-transparent">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="text-5xl">✅</div>
            <div>
              <h4 className="text-xl font-bold text-green-400 mb-1">100% Audited Smart Contract</h4>
              <p className="text-gray-400">Our code is verified and publicly accessible on BNB Smart Chain</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
