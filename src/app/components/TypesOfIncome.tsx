export default function TypesOfIncome() {
  const incomes = [
    { title: "STAKING INCOME", icon: "📊" },
    { title: "DIRECT INCOME", icon: "🎯" },
    { title: "LEVEL INCOME", icon: "📈" },
    { title: "LIFE TIME REWARDS", icon: "🏆" },
  ];

  return (
    <section id="income" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-gold-dark via-black to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">TYPES OF INCOME</h2>
          <div className="accent-line"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {incomes.map((item, index) => (
            <div
              key={index}
              className="card-gold p-8 border-4 border-gold-primary/40 hover:border-gold-primary transition-all group bg-black/80 backdrop-blur-sm text-center"
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="text-xl font-bold text-gold-primary uppercase leading-tight">{item.title}</h3>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
