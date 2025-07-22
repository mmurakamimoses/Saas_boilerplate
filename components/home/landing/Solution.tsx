"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/templates/ui/accordion";
import { PointerHighlight } from "./pointer-highlight";
import { 
  Shield, 
  Search, 
  AlertTriangle, 
  Copy 
} from "lucide-react";

const features = [
  {
    question: "Unbiased Indepth Supplement Research ",
    answer: "Access verified, unbiased supplement data from independent third-party sources with no conflicts of interest.",
    icon: Shield,
    image: "/auth-bg.png"
  },
  {
    question: "Track Recalls & Label Changes",
    answer: "Stay informed about hidden ingredient swaps, banned substances, and safety alerts.",
    icon: Search,
    image: "/glass.png"
  },
  {
    question: "Copy the Best Stacks",
    answer: "See what high-performers like pro athletes and researchers actually use—and replicate their supplement routines.",
    icon: AlertTriangle,
     image: "/auth-bg.png"
  },
  {
    question: "Support More Testing",
    answer: "Discover and replicate proven supplement stacks from verified sources and expert recommendations.",
    icon: Copy,
    image: "/glass.png"
  }
];

const Solution = () => {
  const [selectedItem, setSelectedItem] = useState<string>("item-0");

  const handleValueChange = (value: string) => {
    setSelectedItem(value);
  };

  const getCurrentImage = () => {
    const parts = selectedItem.split('-');
    const index = parts[1] ? parseInt(parts[1]) : 0;
    return features[index]?.image || features[0]?.image || '/solution/auth-bg.png';
  };

  return (
    <section className="bg-[#FDF7F2] py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Left: Headline, Subtitle, Features */}
        <div className="max-w-2xl">
          <h2 className="text-5xl sm:text-6xl font-black leading-tight mb-6 text-gray-900">
            <span className="whitespace-nowrap">
              <PointerHighlight>
                <span>Discover supplements</span>
              </PointerHighlight>
            </span>{" "}
            you can trust.
          </h2>
          <div className="text-xl md:text-2xl text-gray-700 mb-10 font-normal leading-tight">
            The only platform with no skin in the game.
          </div>
          <Accordion
            type="single"
            className="w-full space-y-2 relative"
            value={selectedItem}
            onValueChange={handleValueChange}
          >
            {features.map((feature, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="relative group">
                <AccordionPrimitive.Trigger 
                  className="text-left text-xl md:text-2xl text-gray-900 font-bold leading-tight transition-transform duration-200 hover:translate-x-8 data-[state=open]:translate-x-8 hover:no-underline py-6 w-full flex items-center gap-4 relative"
                >
                  {feature.question}
                </AccordionPrimitive.Trigger>
                <AccordionContent className="text-lg md:text-xl text-gray-700 leading-tight">
                  {feature.answer}
                </AccordionContent>
                {/* Icon positioned outside the trigger's transform */}
                <div className="absolute -left-0 top-7 w-6 h-6 text-gray-600 opacity-0 group-hover:opacity-100 group-data-[state=open]:opacity-100 transition-opacity duration-150 pointer-events-none">
                  <feature.icon className="w-full h-full" />
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      
      {/* Image positioned absolutely at bottom right */}
      <div className="absolute bottom-0 right-0">
        <Image
          src={getCurrentImage()}
          alt="Feature illustration"
          width={600}
          height={600}
          className="w-[600px] h-[600px] object-cover transition-opacity duration-300"
        />
      </div>
    </section>
  );
};

export default Solution;