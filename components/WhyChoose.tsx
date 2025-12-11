export default function WhyChoose() {
  const reasons = [
    {
      title: "Secure Crypto-Based Transactions",
      icon: "🔐"
    },
    {
      title: "Smart Automated Referral Rewards",
      icon: "⚡"
    },
    {
      title: "Lightning-Fast Withdrawals",
      icon: "💰"
    },
    {
      title: "Fully Decentralized – No Admin Control",
      icon: "🔗"
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
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="card-gold p-8 border-4 border-gold-primary/40 hover:border-gold-primary transition-all group bg-black/80 backdrop-blur-sm text-center"
            >
              {/* Icon */}
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gold-primary uppercase leading-tight">
                {reason.title}
              </h3>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
