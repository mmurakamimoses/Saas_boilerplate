"use client";

import { Button } from "@/components/templates/ui/button";
import Link from "next/link";
import Image from "next/image";
import { APITestPanel } from "@/components/api-test-panel";

const logos = [
  "/slider_logos/harvard.png",
  "/slider_logos/stanford.webp", 
  "/slider_logos/cambridge.png",
  "/slider_logos/efsa.png",
  "/slider_logos/tokyo.svg",
  "/slider_logos/john.webp",
  "/slider_logos/mayo.png",
  "/slider_logos/nih.png",
];

const stats = [
  {
    value: "100%",
    label: "Independently funded - no pharma money",
  },
  {
    value: "10,000+",
    label: "Independent Data Points",
  },
  {
    value: "35+",
    label: "Functional Doctor Partnerships",
  },
];

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-[#FDF7F2] flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <h1 className="text-5xl sm:text-6xl font-black leading-tight mb-6 text-gray-900">
              What&apos;s Really Inside Your Supplements?
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-normal mb-8 leading-tight">
              Contaminants. Mislabeled doses. Untested claims. We find the truth — so you get the best.
            </p>
            <div className="flex flex-wrap gap-4 mt-14">
              <Button
                variant="elevated-reverse"
                size="lg"
                className="bg-[#F7C55F] hover:bg-[#F7C55F]/90 text-black rounded-full px-8"
              >
                <Link href="/get-started">Who cares?</Link>
              </Button>
              <Button
                variant="elevated-reverse"
                size="lg"
                className="rounded-full px-8"
              >
                <Link href="/marketplace">Browse Marketplace</Link>
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-0 mt-6">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-start">
                  <div className="px-4 space-y-2">
                    <div className="text-3xl text-gray-900 font-bold">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                  {index < stats.length - 1 && (
                    <div className="w-px h-16 bg-gray-200 self-center" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - API Test Panel */}
          <div className="relative w-full h-[400px] flex items-center justify-center">
            <APITestPanel 
              userType="unauthenticated" 
              className="max-w-md w-full"
            />
          </div>
        </div>
      </div>

      {/* Logo Slider Section */}
      <div className="mt-10">
        <p className="text-center text-sm text-gray-500 mb-8">
          Data from 10,000+ independent studies, reports, and more
        </p>
        <div className="logo-slider-container relative w-full overflow-hidden">
          {/* Left fade mask */}
          <div className="absolute left-0 top-0 w-32 h-16 bg-gradient-to-r from-[#FDF7F2] to-transparent z-10" />
          {/* Right fade mask */}
          <div className="absolute right-0 top-0 w-32 h-16 bg-gradient-to-l from-[#FDF7F2] to-transparent z-10" />
          <div className="flex animate-infinite-scroll">
            {/* First set of logos */}
            {logos.map((logo, i) => (
              <div key={i} className="flex-shrink-0 w-32 h-16 mx-8 relative">
                <Image
                  src={logo}
                  alt={`Research Institution ${i + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
            {/* Duplicate sets for seamless loop */}
            {[...Array(3)].map((_, setIndex) => (
              logos.map((logo, i) => (
                <div key={`set-${setIndex}-${i}`} className="flex-shrink-0 w-32 h-16 mx-8 relative">
                  <Image
                    src={logo}
                    alt={`Research Institution ${i + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;