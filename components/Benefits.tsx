export default function Benefits() {
  const benefits = [
    { title: "100% Blockchain-Based System", icon: "🔗" },
    { title: "Automated Staking Rewards", icon: "⚡" },
    { title: "Decentralized & Trustless", icon: "🛡️" },
    { title: "Instant Payouts", icon: "💰" },
    { title: "Zero Maintenance Required", icon: "✨" },
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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="card-gold p-8 border-4 border-gold-primary/40 hover:border-gold-primary transition-all group bg-black/80 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gold-primary uppercase leading-tight">
                  {benefit.title}
                </h3>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
