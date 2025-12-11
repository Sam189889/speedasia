export default function Mission() {
  return (
    <section id="mission" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">OUR MISSION</h2>
          <div className="accent-line"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="card-gold p-10 md:p-12 border-4 border-gold-primary/40 hover:border-gold-primary">
            <p className="text-white text-lg md:text-xl leading-relaxed text-center">
              The mission of the Speed Asia community is to build a <span className="text-gold-primary font-black">powerful and thriving global network</span> through an innovative referral ecosystem that empowers individuals to unlock substantial income and expand their financial potential. We aim to provide people with the right <span className="text-gold-primary font-bold">tools, opportunities, and support</span> for sustainable financial success. Our commitment is to establish Speed Asia as <span className="text-gold-primary font-black">one of the largest, strongest, and most influential blockchain communities worldwide</span>—driven by empowerment, collaboration, and long-term growth.
            </p>
          </div>
        </div>


      </div>
    </section>
  );
}
