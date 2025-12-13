export default function DirectIncome() {
  return (
    <section id="direct-income" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-gold-dark via-black to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">DIRECT INCOME</h2>
          <div className="accent-line"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="card-gold p-10 md:p-12 border-4 border-gold-primary/40 hover:border-gold-primary mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gold-primary mb-6 shadow-[0_0_50px_rgba(255,215,0,0.5)]">
                <span className="text-black font-black text-5xl">3%</span>
              </div>
              <h3 className="text-gold-primary font-black text-3xl mb-4">Direct Income: 3%</h3>
            </div>

            <div className="space-y-6">
              <p className="text-white text-lg md:text-xl leading-relaxed text-center">
                Direct income is applicable on all IDs with a <span className="text-gold-primary font-black">minimum activation of $20 and above</span>.
              </p>

              <div className="card-gold p-6 border-2 border-gold-primary/30 bg-gold-primary/5">
                <div className="flex items-start gap-3">
                  <div className="text-gold-primary text-2xl">📌</div>
                  <div>
                    <h4 className="text-gold-primary font-bold text-lg mb-2">Note:</h4>
                    <p className="text-white">Earn instant rewards when your direct referrals activate their accounts with a minimum of $20.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
