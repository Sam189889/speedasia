export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">ABOUT SPEED ASIA</h2>
          <div className="accent-line"></div>
        </div>

        {/* Main About Content */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="card-gold p-10 md:p-12 border-4 border-gold-primary/40 hover:border-gold-primary">
            <p className="text-white text-lg md:text-xl leading-relaxed mb-6">
              Speed Asia is an <span className="text-gold-primary font-black">innovative blockchain-based smart contract staking platform</span> designed to create a transparent, secure, and automated earning ecosystem for users worldwide. Built on decentralized technology, Speed Asia eliminates all forms of manual control, ensuring a fully trustless environment where every transaction and reward distribution is handled by an immutable smart contract.
            </p>
            <p className="text-white text-lg md:text-xl leading-relaxed mb-6">
              Our mission is to empower individuals with simple, accessible, and reliable blockchain earning opportunities. Through <span className="text-gold-primary font-bold">automated staking rewards, instant payouts, and a smart referral system</span>, Speed Asia provides a seamless earning experience that anyone can participate in—without technical expertise or third-party involvement.
            </p>
            <p className="text-white text-lg md:text-xl leading-relaxed">
              We are committed to building a <span className="text-gold-primary font-black">long-term, global community</span> powered by transparency, sustainability, and financial independence. With a focus on innovation and user empowerment, Speed Asia aims to become one of the most trusted and impactful blockchain projects in the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
