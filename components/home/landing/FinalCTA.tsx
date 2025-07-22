import React from 'react'
import { Button } from '@/components/templates/ui/button'

const FinalCTA = () => {
  return (
    <section className="bg-[#FDF7F2] py-16 relative z-10">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl sm:text-6xl font-black leading-tight mb-6 text-gray-900">
          No One Should Swallow Uncertainty
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 font-normal max-w-4xl mx-auto mb-8 leading-tight">
          Join thousands of health-conscious individuals fighting back
        </p>
        <Button variant="elevated-reverse" size="lg" className="bg-[#F7C55F] hover:bg-[#F7C55F]/90 text-black">
          Browse Marketplace
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;