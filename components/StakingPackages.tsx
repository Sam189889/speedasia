export default function StakingPackages() {
  return (
    <section id="packages" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">STAKING PACKAGES</h2>
          <div className="accent-line"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Package Range Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Minimum Package */}
            <div className="card-gold p-10 border-4 border-gold-primary/40 hover:border-gold-primary transition-all transform hover:-translate-y-2 bg-black/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="inline-block px-4 py-2 bg-gold-primary/10 rounded-full text-xs font-bold uppercase tracking-wider text-gold-primary mb-6 border-2 border-gold-primary">
                  Minimum Entry
                </div>
                <div className="text-7xl font-black text-gold-primary mb-4">$5</div>
                <div className="text-white font-bold uppercase tracking-wide text-lg mb-6">Minimum Staking Package Range</div>

                <div className="pt-6 border-t-2 border-gold-primary/30">
                  <p className="text-gray-300 text-sm">
                    Start your journey with as little as <span className="text-gold-primary font-bold">$5</span> and begin earning rewards immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Maximum Package */}
            <div className="card-gold p-10 border-4 border-gold-primary bg-gradient-to-b from-gold-primary/10 to-black relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gold-primary text-black text-xs font-bold px-4 py-2 uppercase">
                Maximum
              </div>

              <div className="text-center">
                <div className="inline-block px-4 py-2 bg-gold-primary/20 rounded-full text-xs font-bold uppercase tracking-wider text-gold-primary mb-6 border-2 border-gold-primary">
                  Maximum Limit
                </div>
                <div className="text-7xl font-black text-gold-primary mb-4">$5,000</div>
                <div className="text-white font-bold uppercase tracking-wide text-lg mb-6">Maximum Staking Package Range</div>

                <div className="pt-6 border-t-2 border-gold-primary/30">
                  <p className="text-gray-300 text-sm">
                    Scale your investment up to <span className="text-gold-primary font-bold">$5,000</span> for maximum earning potential.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a
              href="https://www.speedasia.io"
              target="_blank"
              rel="noreferrer"
              className="btn-gold text-xl px-12 py-6"
            >
              🚀 Start Staking Now
            </a>
          </div>
        </div>


      </div>
    </section>
  );
}
