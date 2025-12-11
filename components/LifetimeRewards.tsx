export default function LifetimeRewards() {
  const rewards = [
    { direct: "5 Direct", team: "30 Team", business: "$10,000", reward: "$200" },
    { direct: "10 Direct", team: "100 Team", business: "$30,000", reward: "$750" },
    { direct: "20 Direct", team: "200 Team", business: "$70,000", reward: "$2,500" },
    { direct: "30 Direct", team: "500 Team", business: "$100,000", reward: "$5,000" },
    { direct: "40 Direct", team: "600 Team", business: "$200,000", reward: "$15,000" },
    { direct: "50 Direct", team: "2000 Team", business: "$500,000", reward: "$25,000" },
  ];

  return (
    <section id="lifetime-rewards" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-gold-dark via-black to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">LIFE TIME REWARD INCOME</h2>
          <div className="accent-line"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {rewards.map((item, index) => (
            <div
              key={index}
              className="card-gold p-8 border-4 border-gold-primary/40 hover:border-gold-primary transition-all group bg-black/80 backdrop-blur-sm"
            >
              {/* Direct */}
              <div className="text-center mb-6">
                <div className="text-sm text-gray-400 uppercase font-bold tracking-widest mb-2">Direct</div>
                <div className="text-gold-primary font-black text-3xl">{item.direct}</div>
              </div>

              <div className="w-full h-px bg-gold-primary/30 mb-6"></div>

              {/* Team & Business */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm uppercase">Team</span>
                  <span className="text-white font-bold text-lg">{item.team}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm uppercase">Business</span>
                  <span className="text-white font-bold text-lg">{item.business}</span>
                </div>
              </div>

              <div className="w-full h-px bg-gold-primary/30 mb-6"></div>

              {/* Reward */}
              <div className="text-center">
                <div className="text-xs text-gold-primary uppercase mb-2 font-bold tracking-wider">Cash Reward</div>
                <div className="text-gold-primary font-black text-4xl group-hover:scale-110 transition-transform">
                  {item.reward}
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
