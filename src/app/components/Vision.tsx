export default function Vision() {
  const goals = [
    { icon: "🏆", text: "Top 5 Blockchain Project" },
    { icon: "🌍", text: "Global Participant Base" },
    { icon: "💎", text: "Industry Leader" },
  ];

  return (
    <section id="vision" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-gold-dark via-black to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-purple-400 text-sm font-bold uppercase tracking-wider">Where We're Heading</span>
          <h2 className="section-heading mt-2">OUR VISION</h2>
          <div className="accent-line"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Main Card */}
          <div className="card-gold p-8 md:p-10 border-4 border-purple-500/40 hover:border-purple-500 bg-gradient-to-br from-purple-500/10 to-transparent mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-4xl">🔭</span>
              </div>
              <p className="text-white text-lg md:text-xl leading-relaxed text-center md:text-left">
                To become <span className="text-purple-400 font-black">one of the top five blockchain projects</span> globally, setting new standards of excellence in decentralized finance with <span className="text-gold-primary font-bold">trust, innovation, and community-driven growth</span>.
              </p>
            </div>
          </div>

          {/* Goals */}
          <div className="flex flex-wrap justify-center gap-4">
            {goals.map((goal, idx) => (
              <div key={idx} className="flex items-center gap-3 px-6 py-3 bg-purple-500/10 rounded-full border border-purple-500/30 hover:border-purple-500 transition-all">
                <span className="text-2xl">{goal.icon}</span>
                <span className="text-white font-bold">{goal.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
