export default function LevelIncome() {
  const levels = [
    { level: "1", percent: "15%" },
    { level: "2", percent: "8%" },
    { level: "3", percent: "5%" },
    { level: "4", percent: "3%" },
    { level: "5", percent: "2%" },
    { level: "6", percent: "1%" },
    { level: "7 - 20", percent: "0.5%" },
  ];

  return (
    <section id="level-income" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">LEVEL INCOME</h2>
          <div className="accent-line"></div>
          <div className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gold-primary/10 border-2 border-gold-primary rounded-full">
            <span className="text-2xl">📌</span>
            <span className="text-gold-primary font-bold uppercase tracking-wider">LEVEL INCOME ONLY ON ROI</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Level Table */}
          <div className="card-gold overflow-hidden border-4 border-gold-primary/40 mb-12">
            <div className="bg-gold-primary px-8 py-5 flex justify-between items-center">
              <span className="text-black font-black uppercase text-xl">Level</span>
              <span className="text-black font-black uppercase text-xl">Percentage</span>
            </div>
            <div className="p-6 bg-black/80 backdrop-blur-sm">
              {levels.map((lvl, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-6 border-b-2 border-gold-primary/20 last:border-0 hover:bg-gold-primary/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 font-medium">Level</span>
                    <span className="text-white font-bold text-xl">{lvl.level}</span>
                  </div>
                  <span className="text-gold-primary font-black text-3xl">{lvl.percent}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Points */}
          <div className="card-gold p-8 md:p-10 border-4 border-gold-primary/40 bg-gold-primary/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-gold-primary text-3xl">📌</div>
              <h3 className="text-gold-primary font-black text-2xl uppercase">Key Points:</h3>
            </div>
            <div className="space-y-4 pl-14">
              <p className="text-white text-lg leading-relaxed">
                To unlock earnings up to <span className="text-gold-primary font-black">20 levels</span>, a minimum business of <span className="text-gold-primary font-bold">$20 per level</span> is required, or a total of <span className="text-gold-primary font-bold">$2,000 direct business</span>.
              </p>
              <p className="text-white text-lg leading-relaxed">
                Each direct referral with a <span className="text-gold-primary font-bold">$20 activation</span> will open <span className="text-gold-primary font-bold">1 level</span> in the system.
              </p>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
