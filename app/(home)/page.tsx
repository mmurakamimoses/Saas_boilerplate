import Hero from "@/components/home/landing/Hero";
import Problem from "@/components/home/landing/Problem";
import Solution from "@/components/home/landing/Solution";
import Counter from "@/components/home/landing/Counter";
import SocialProof from "@/components/home/landing/SocialProof";
import Pricing from "@/components/home/landing/Pricing";
import FinalCTA from "@/components/home/landing/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Counter />
      <SocialProof />
      <Pricing />
      <FinalCTA />
    </>
  );
} 