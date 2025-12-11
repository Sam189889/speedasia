export default function Vision() {
  return (
    <section id="vision" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-gold-dark via-black to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">OUR VISION</h2>
          <div className="accent-line"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="card-gold p-10 md:p-12 border-4 border-gold-primary/40 hover:border-gold-primary">
            <p className="text-white text-lg md:text-xl leading-relaxed text-center">
              Speed Asia envisions becoming <span className="text-gold-primary font-black">one of the top five blockchain projects</span> in the global market, setting new standards of excellence in the decentralized world. Our goal is to attract the <span className="text-gold-primary font-bold">largest and most active global participant base</span>, surpassing other initiatives in both scale and impact. We are committed to building a brand rooted in <span className="text-gold-primary font-bold">trust, innovation, and community-driven growth</span>, establishing Speed Asia as a respected and reliable name in blockchain technology.
            </p>
          </div>
        </div>


      </div>
    </section>
  );
}
