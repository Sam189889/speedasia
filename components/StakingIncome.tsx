export default function StakingIncome() {
  const stakingPlans = [
    { days: "7 Days", interest: "3%" },
    { days: "14 Days", interest: "7%" },
    { days: "21 Days", interest: "16%" },
    { days: "30 Days", interest: "25%" },
  ];

  return (
    <section id="staking-income" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">STAKING INCOME</h2>
          <div className="accent-line"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Staking Plans Table */}
          <div className="card-gold overflow-hidden border-4 border-gold-primary/40 mb-12">
            <div className="bg-gold-primary px-8 py-5 flex justify-between items-center">
              <span className="text-black font-black uppercase text-xl">Days</span>
              <span className="text-black font-black uppercase text-xl">Interest</span>
            </div>
            <div className="p-6 bg-black/80 backdrop-blur-sm">
              {stakingPlans.map((plan, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-6 border-b-2 border-gold-primary/20 last:border-0 hover:bg-gold-primary/10 transition-all"
                >
                  <span className="text-white font-bold text-xl">{plan.days}</span>
                  <span className="text-gold-primary font-black text-3xl">{plan.interest}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="card-gold p-8 border-4 border-gold-primary/40 bg-gold-primary/5">
            <div className="flex items-start gap-4">
              <div className="text-gold-primary text-3xl">📌</div>
              <div>
                <h3 className="text-gold-primary font-black text-xl mb-3 uppercase">Note:</h3>
                <p className="text-white text-lg leading-relaxed">
                  Upon completion of your staking period, both your <span className="text-gold-primary font-bold">principal amount</span> and the <span className="text-gold-primary font-bold">accumulated interest</span> will be automatically credited to your connected wallet.
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
