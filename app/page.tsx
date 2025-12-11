import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Vision from "@/components/Vision";
import Mission from "@/components/Mission";
import KeyElements from "@/components/KeyElements";
import WhyChoose from "@/components/WhyChoose";
import Benefits from "@/components/Benefits";
import TypesOfIncome from "@/components/TypesOfIncome";
import StakingPackages from "@/components/StakingPackages";
import StakingIncome from "@/components/StakingIncome";
import DirectIncome from "@/components/DirectIncome";
import LevelIncome from "@/components/LevelIncome";
import LifetimeRewards from "@/components/LifetimeRewards";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold-primary selection:text-black">
      <Header />

      <main className="relative">
        <Hero />
        <About />
        <Vision />
        <Mission />
        <KeyElements />
        <WhyChoose />
        <Benefits />
        <TypesOfIncome />
        <StakingPackages />
        <StakingIncome />
        <DirectIncome />
        <LevelIncome />
        <LifetimeRewards />
      </main>

      <BottomNav />
    </div>
  );
}

