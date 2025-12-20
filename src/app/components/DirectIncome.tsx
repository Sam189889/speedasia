export default function DirectIncome() {
  return (
    <section id="direct-income" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-gold-dark via-black to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">DIRECT REFERRAL INCOME</h2>
          <div className="accent-line"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="card-gold p-8 md:p-12 border-4 border-gold-primary/40 hover:border-gold-primary relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              {/* Hero Section */}
              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <div className="relative">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-gold-primary to-gold-secondary flex items-center justify-center shadow-[0_0_60px_rgba(255,215,0,0.4)]">
                    <span className="text-black font-black text-5xl">3%</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 text-4xl">💰</div>
                </div>

                <div className="text-center md:text-left flex-1">
                  <h3 className="text-gold-primary font-black text-3xl mb-3">Instant 3% Bonus</h3>
                  <p className="text-gray-300 text-lg">
                    Earn <span className="text-gold-primary font-bold">3% commission</span> every time your direct referral stakes $20 or more.
                    Rewards are credited <span className="text-green-400 font-bold">instantly</span> to your wallet!
                  </p>
                </div>
              </div>

              {/* How it works */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-black/50 rounded-xl border border-gold-primary/20 text-center">
                  <div className="text-3xl mb-2">1️⃣</div>
                  <div className="text-white font-bold mb-1">Share Your Link</div>
                  <div className="text-gray-400 text-sm">Invite friends using your unique referral link</div>
                </div>
                <div className="p-4 bg-black/50 rounded-xl border border-gold-primary/20 text-center">
                  <div className="text-3xl mb-2">2️⃣</div>
                  <div className="text-white font-bold mb-1">They Stake $20+</div>
                  <div className="text-gray-400 text-sm">Your referral activates with minimum $20</div>
                </div>
                <div className="p-4 bg-black/50 rounded-xl border border-gold-primary/20 text-center">
                  <div className="text-3xl mb-2">3️⃣</div>
                  <div className="text-white font-bold mb-1">You Earn 3%</div>
                  <div className="text-gray-400 text-sm">Instant commission credited to wallet</div>
                </div>
              </div>

              {/* Example Calculation */}
              <div className="card-gold p-6 border-2 border-green-500/30 bg-gradient-to-r from-green-500/10 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">💡</div>
                  <div>
                    <h4 className="text-green-400 font-bold mb-1">Example</h4>
                    <p className="text-gray-300">
                      Your friend stakes <span className="text-white font-bold">$1,000</span> → You instantly earn <span className="text-gold-primary font-bold">$30</span>
                    </p>
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
