import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Vision from "@/app/components/Vision";
import Mission from "@/app/components/Mission";
import KeyElements from "@/app/components/KeyElements";
import WhyChoose from "@/app/components/WhyChoose";
import Benefits from "@/app/components/Benefits";
import TypesOfIncome from "@/app/components/TypesOfIncome";
import StakingPackages from "@/app/components/StakingPackages";
import StakingIncome from "@/app/components/StakingIncome";
import DirectIncome from "@/app/components/DirectIncome";
import LevelIncome from "@/app/components/LevelIncome";
import LifetimeRewards from "@/app/components/LifetimeRewards";
import BottomNav from "@/app/components/BottomNav";

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

