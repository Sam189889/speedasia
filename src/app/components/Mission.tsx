export default function Mission() {
  const pillars = [
    { icon: "🌐", title: "Global Network", desc: "Connecting investors worldwide" },
    { icon: "💪", title: "Empowerment", desc: "Tools for financial freedom" },
    { icon: "🤝", title: "Collaboration", desc: "Growing together as community" },
  ];

  return (
    <section id="mission" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">What We Stand For</span>
          <h2 className="section-heading mt-2">OUR MISSION</h2>
          <div className="accent-line"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Main Card */}
          <div className="card-gold p-8 md:p-10 border-4 border-blue-500/40 hover:border-blue-500 bg-gradient-to-br from-blue-500/10 to-transparent mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <span className="text-4xl">🎯</span>
              </div>
              <p className="text-white text-lg md:text-xl leading-relaxed text-center md:text-left">
                To build a <span className="text-blue-400 font-black">powerful and thriving global network</span> through an innovative ecosystem that empowers individuals to unlock substantial income and achieve <span className="text-gold-primary font-bold">financial freedom</span>.
              </p>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="card-gold p-6 border-2 border-gold-primary/30 hover:border-gold-primary text-center transition-all hover:scale-105">
                <div className="text-4xl mb-3">{pillar.icon}</div>
                <h4 className="text-gold-primary font-bold mb-1">{pillar.title}</h4>
                <p className="text-gray-400 text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
