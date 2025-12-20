export default function KeyElements() {
  const elements = [
    {
      title: "Distributed Ledger",
      description: "All transactions are recorded on a shared, tamper-proof ledger accessible to everyone. No hidden records, no secret dealings.",
      icon: "📊",
      color: "from-blue-500/20",
      iconBg: "bg-blue-500/20 border-blue-500/40"
    },
    {
      title: "Immutability",
      description: "Once recorded, data cannot be altered or deleted. Every transaction is permanent and fully transparent to all participants.",
      icon: "🔒",
      color: "from-purple-500/20",
      iconBg: "bg-purple-500/20 border-purple-500/40"
    },
    {
      title: "Smart Contracts",
      description: "Self-executing code that automatically handles all transactions. No middlemen, no delays, no human error.",
      icon: "📝",
      color: "from-green-500/20",
      iconBg: "bg-green-500/20 border-green-500/40"
    }
  ];

  return (
    <section id="key-elements" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-primary text-sm font-bold uppercase tracking-wider">Powered By</span>
          <h2 className="section-heading mt-2">BLOCKCHAIN TECHNOLOGY</h2>
          <div className="accent-line"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {elements.map((element, index) => (
            <div
              key={index}
              className={`card-gold p-8 border-2 border-gold-primary/30 hover:border-gold-primary transition-all group bg-gradient-to-br ${element.color} to-transparent hover:scale-105`}
            >
              {/* Icon with background */}
              <div className={`w-16 h-16 rounded-xl ${element.iconBg} border-2 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto`}>
                <span className="text-3xl">{element.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-black text-gold-primary mb-4 uppercase text-center">
                {element.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed text-center">
                {element.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gold-primary/10 rounded-full border border-gold-primary/30">
            <span className="text-2xl">⛓️</span>
            <span className="text-gold-primary font-bold">Built on BNB Smart Chain</span>
            <span className="text-2xl">⛓️</span>
          </div>
        </div>
      </div>
    </section>
  );
}
