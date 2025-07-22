"use client"
import React, { useState, useRef, useEffect } from "react";
import { TbBrandTiktok } from "react-icons/tb";
import { TbBrandTiktokFilled } from "react-icons/tb";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";
import instagramAnimation from "../../public/animations/Instagram/instagram.json";
import twitterAnimation from "../../public/animations/Twitter/twitter.json";

export function Footer() {
  const [isInstagramHovered, setIsInstagramHovered] = useState(false);
  const [isTwitterHovered, setIsTwitterHovered] = useState(false);
  const [isTikTokHovered, setIsTikTokHovered] = useState(false);
  const lottieRef = useRef<any>(null);
  const twitterLottieRef = useRef<any>(null);

  useEffect(() => {
    if (lottieRef.current) {
      if (isInstagramHovered) {
        lottieRef.current.setDirection(1);
        lottieRef.current.play();
      } else {
        lottieRef.current.setDirection(-1);
        lottieRef.current.play();
      }
    }
  }, [isInstagramHovered]);

  useEffect(() => {
    if (twitterLottieRef.current) {
      if (isTwitterHovered) {
        twitterLottieRef.current.setDirection(1);
        twitterLottieRef.current.play();
      } else {
        twitterLottieRef.current.setDirection(-1);
        twitterLottieRef.current.play();
      }
    }
  }, [isTwitterHovered]);

  return (
    <footer className="bg-gradient-to-br from-purple-200 to-yellow-200 text-black pt-8 pb-4 border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Row: Brand and Socials */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8">
          <div className="flex flex-col gap-2">
            <span className={cn("text-7xl font-extrabold tracking-tight -mb-4")}>Stacks.fit</span>
          </div>    
          <div className="flex flex-col items-end gap-2">
            <span className="font-semibold mb-1">Follow Us</span>
            <div className="flex gap-10">
              <a 
                href="#" 
                aria-label="TikTok" 
                className='pt-1 relative'
                onMouseEnter={() => setIsTikTokHovered(true)}
                onMouseLeave={() => setIsTikTokHovered(false)}
              >
                <TbBrandTiktok className="w-9 h-9 text-black" />
                <TbBrandTiktokFilled 
                  className="w-9 h-9 text-[#00f2ea] absolute top-1 left-0 transition-opacity duration-500 ease-in-out" 
                  style={{ opacity: isTikTokHovered ? 1 : 0 }}
                />
              </a>
              <a 
                href="#" 
                aria-label="Twitter"
                onMouseEnter={() => setIsTwitterHovered(true)}
                onMouseLeave={() => setIsTwitterHovered(false)}
              >
                <Lottie
                  lottieRef={twitterLottieRef}
                  animationData={twitterAnimation}
                  loop={false}
                  autoplay={false}
                  className="w-10 h-10"
                  style={{ filter: 'brightness(0) saturate(100%)' }} // Makes it black like other icons
                />
              </a>
              <a 
                href="#" 
                aria-label="Instagram"
                onMouseEnter={() => setIsInstagramHovered(true)}
                onMouseLeave={() => setIsInstagramHovered(false)}
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={instagramAnimation}
                  loop={false}
                  autoplay={false}
                  className="w-10 h-10"
                  style={{ filter: 'brightness(0) saturate(100%)' }} // Makes it black like other icons
                />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-black/30 mb-8" />

        {/* Mission Statement with Glass Image */}
        <div className="mb-8 flex items-end gap-4">
          <Image src="/glass.png" alt="Glass" width={64} height={64} className="h-16 w-auto" />
          <h2 className="text-2xl md:text-3xl font-bold leading-tight text-black">
            Transparency. Transparency...Transparency!
          </h2>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="mb-4 text-lg font-bold uppercase tracking-wide text-black">About</div>
            <div className="space-y-4">
              <a href="" className="block font-medium hover:underline hover:text-gray-700 transition-colors">Home</a>
              <a href="/partnerships" className="block font-medium hover:underline hover:text-gray-700 transition-colors">Healthcare Professionals</a>
            </div>
          </div>
          <div>
            <div className="mb-4 text-lg font-bold uppercase tracking-wide text-black">Explore</div>
            <div className="space-y-4">
              <Link href="/marketplace" className="block font-medium hover:underline hover:text-gray-700 transition-colors">Marketplace</Link>
              <a href="/popular-stacks" className="block font-medium hover:underline hover:text-gray-700 transition-colors">Popular Stacks</a>
              <a href="/research" className="block font-medium hover:underline hover:text-gray-700 transition-colors">Research Reports</a>
            </div>
          </div>
          <div>
            <div className="mb-4 text-lg font-bold uppercase tracking-wide text-black">Support</div>
            <div className="space-y-4">
              <a href="mailto:max.murakamimoses24@gmail.com" className="block font-medium hover:underline hover:text-gray-700 transition-colors">Contact</a>
              <a href="/partnerships" className="block font-medium hover:underline hover:text-gray-700 transition-colors">Partnerships</a>
              <a href="/disclosures" className="block font-medium hover:underline hover:text-gray-700 transition-colors">Legal</a>
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright */}
        <div className="flex justify-center mt-6">
          <span className="text-sm text-center text-black">© Stacks.fit 2025 All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}