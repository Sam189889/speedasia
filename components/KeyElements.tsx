export default function KeyElements() {
  const elements = [
    {
      title: "Distributed Ledger Technology",
      description: "Distributed ledger technology allows all network participants to access a secure, tamper-proof record of transactions in real time. By removing the need for repeated entries and manual reconciliation, it streamlines processes and makes business faster, smarter, and more efficient.",
      icon: "📊"
    },
    {
      title: "Immutability",
      description: "Once a transaction is added to the shared ledger, no one can alter or delete it. If there's an error, a new transaction must be added to correct it—ensuring full transparency, as both records remain visible to all participants.",
      icon: "🔒"
    },
    {
      title: "Smart Contracts",
      description: "Smart contracts are self-executing rules stored on the blockchain that automate and speed up transactions. They can handle everything from corporate bond transfers to triggering travel insurance payouts—securely and without middlemen.",
      icon: "📝"
    }
  ];

  return (
    <section id="key-elements" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">KEY ELEMENTS OF A BLOCKCHAIN</h2>
          <div className="accent-line"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {elements.map((element, index) => (
            <div
              key={index}
              className="card-gold p-8 md:p-10 border-4 border-gold-primary/40 hover:border-gold-primary transition-all group bg-black/80 backdrop-blur-sm"
            >
              {/* Icon */}
              <div className="text-6xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                {element.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-gold-primary mb-4 uppercase text-center">
                {element.title}
              </h3>

              {/* Description */}
              <p className="text-white leading-relaxed text-center">
                {element.description}
              </p>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
