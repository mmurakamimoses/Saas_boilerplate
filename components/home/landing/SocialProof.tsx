"use client";

import SparklesText from '@/components/templates/MagicUI/sparkles-text';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";

// Custom fade animation for testimonial transitions
const fadeAnim = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeInOut' as const } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.4, ease: 'easeInOut' as const } },
};

const userGroups = [
  "Doctors",
  "Nutritionists",
  "Athletes",
  "Health Nuts"
];

const testimonials = [
  // Athletes
  {
    group: "Athletes",
    quote: "This supplement stack has completely transformed my performance. I've never felt stronger or more energized during training sessions.",
    name: "Mike Johnson",
    role: "Professional Runner",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    logo: null,
    large: true,
  },
  {
    group: "Athletes",
    quote: "The recovery time has been incredible. I'm back to training faster than ever before.",
    name: "Sarah Chen",
    role: "Olympic Swimmer",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    logo: null,
    large: false,
  },
  {
    group: "Athletes",
    quote: "My endurance has improved dramatically. This is exactly what I needed for my marathon training.",
    name: "David Rodriguez",
    role: "Marathon Runner",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    logo: null,
    large: false,
  },
  {
    group: "Athletes",
    quote: "The mental clarity and focus during competitions has been game-changing for me.",
    name: "Emma Thompson",
    role: "Professional Cyclist",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    logo: null,
    large: false,
  },

  // Doctors
  {
    group: "Doctors",
    quote: "As a physician, I'm impressed by the research quality and transparency. This is exactly what evidence-based medicine should look like.",
    name: "Dr. Michael Chang",
    role: "Internal Medicine",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    logo: null,
    large: false,
  },
  {
    group: "Doctors",
    quote: "Finally, supplement recommendations I can trust and recommend to my patients with confidence.",
    name: "Dr. Lisa Rodriguez",
    role: "Family Medicine",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    logo: null,
    large: false,
  },
  {
    group: "Doctors",
    quote: "The peer-reviewed approach gives me confidence in these recommendations for my practice.",
    name: "Dr. James Wilson",
    role: "Sports Medicine",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    logo: null,
    large: false,
  },
  {
    group: "Doctors",
    quote: "This platform bridges the gap between clinical research and practical supplementation advice.",
    name: "Dr. Maria Santos",
    role: "Functional Medicine",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    logo: null,
    large: false,
  },

  // Nutritionists
  {
    group: "Nutritionists",
    quote: "The detailed nutritional analysis helps me create more effective meal plans for my clients.",
    name: "Jessica Taylor",
    role: "Registered Dietitian",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    logo: null,
    large: false,
  },
  {
    group: "Nutritionists",
    quote: "Having access to unbiased supplement data has revolutionized how I advise my clients.",
    name: "Robert Kim",
    role: "Sports Nutritionist",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    logo: null,
    large: false,
  },
  {
    group: "Nutritionists",
    quote: "The quality control standards shown here set the bar for what supplements should be.",
    name: "Amanda Foster",
    role: "Clinical Nutritionist",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    logo: null,
    large: false,
  },
  {
    group: "Nutritionists",
    quote: "This transparency in supplement testing is exactly what our industry has been missing.",
    name: "Thomas Brown",
    role: "Wellness Coach",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    logo: null,
    large: false,
  },

  // Health Nuts
  {
    group: "Health Nuts",
    quote: "Finally found supplements that actually work! The transparency gives me peace of mind.",
    name: "Sofia Martinez",
    role: "Fitness Enthusiast",
    avatar: "https://randomuser.me/api/portraits/women/13.jpg",
    logo: null,
    large: false,
  },
  {
    group: "Health Nuts",
    quote: "The research-backed recommendations have taken my wellness routine to the next level.",
    name: "Alex Thompson",
    role: "Biohacker",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    logo: null,
    large: false,
  },
  {
    group: "Health Nuts",
    quote: "Love knowing exactly what I'm putting in my body. This level of detail is incredible.",
    name: "Rachel Green",
    role: "Wellness Blogger",
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
    logo: null,
    large: false,
  },
  {
    group: "Health Nuts",
    quote: "The independent testing results give me confidence I'm making the right choices.",
    name: "Kevin Lee",
    role: "Health Optimizer",
    avatar: "https://randomuser.me/api/portraits/men/16.jpg",
    logo: null,
    large: false,
  },
];

const SocialProof = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>("Doctors");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-switch tabs every 5 seconds
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSelectedGroup((prev: string): string => {
        const currentIndex = userGroups.indexOf(prev);
        // Always return a string, fallback to 'Athletes' if not found
        if (currentIndex === -1) return userGroups[0] || "Athletes";
        return userGroups[(currentIndex + 1) % userGroups.length] || userGroups[0] || "Athletes";
      });
    }, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [selectedGroup]);

  const handleTabClick = (group: string) => {
    setSelectedGroup(group);
    // Timer will reset due to selectedGroup change
  };

  const filteredTestimonials = selectedGroup 
    ? testimonials.filter(t => t.group === selectedGroup)
    : testimonials.slice(0, 4); // Show first 4 by default

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-2 py-12 bg-[#FDF7F2]">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold leading-none tracking-tight text-gray-900">
          Trusted by thousands across{" "}
          <SparklesText 
            className="inline-block px-1 font-bold tracking-tight text-4xl md:text-5xl"
            colors={{ first: "#FF6B6B", second: "#4ECDC4" }}
            sparklesCount={10}
          >
            many universes
          </SparklesText>
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 font-normal leading-tight mt-4 max-w-2xl mx-auto">
          Real stories from real people who&apos;ve transformed their health and performance.
        </p>
      </div>

      {/* User Groups and Review Summary */}
      <div className="w-full max-w-7xl pb-4">
        <div className="flex flex-wrap items-center justify-between text-left">
          {/* Tabs */}
          <div className="flex flex-wrap gap-4">
            {userGroups.map((group, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(group)}
                className={`text-xl font-medium transition-all duration-200 px-4 py-2 rounded-lg ${
                  selectedGroup === group 
                    ? 'bg-purple-200 text-purple-800' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
          {/* Review Summary */}
          <div className="flex flex-col items-end mt-4 md:mt-0 min-w-[170px]">
            <span className="text-gray-500 text-base">Based on 1.5k reviews</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                {/* 5 stars */}
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">4.9</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bento grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 md:grid-rows-2">
        {/* Large card (left, spans 2 rows) */}
        {filteredTestimonials[0] && (
          <div className="md:row-span-2 bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out p-8 flex flex-col justify-between min-h-[340px] md:min-h-[420px]">
            <div>
              <div className="text-4xl text-red-500 mb-2">&rdquo;</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={filteredTestimonials[0].quote + filteredTestimonials[0].name}
                  variants={fadeAnim}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-gray-700 text-xl mb-6"
                >
                  {filteredTestimonials[0].quote}
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={filteredTestimonials[0].name + filteredTestimonials[0].role}
                variants={fadeAnim}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex items-center gap-3 mt-auto"
              >
                <Image src={filteredTestimonials[0].avatar} alt={filteredTestimonials[0].name} className="w-10 h-10 rounded-full" width={40} height={40} />
                <div>
                  <div className="font-semibold text-gray-900 text-lg">{filteredTestimonials[0].name}</div>
                  <div className="text-base text-gray-500">{filteredTestimonials[0].role}</div>
                </div>
                {filteredTestimonials[0].logo && (
                  <Image src={filteredTestimonials[0].logo} alt="logo" className="w-6 h-6 ml-2 opacity-70" width={24} height={24} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
        {/* Top right card (spans 2 columns, single testimonial) */}
        {filteredTestimonials[1] && (
          <div className="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out p-6 flex flex-col justify-between md:col-span-2">
            <div>
              <div className="text-3xl text-red-500 mb-2">&rdquo;</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={filteredTestimonials[1].quote + filteredTestimonials[1].name}
                  variants={fadeAnim}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-gray-700 text-lg"
                >
                  {filteredTestimonials[1].quote}
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={filteredTestimonials[1].name + filteredTestimonials[1].role}
                variants={fadeAnim}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex items-center gap-3 mt-auto"
              >
                <Image src={filteredTestimonials[1].avatar} alt={filteredTestimonials[1].name} className="w-8 h-8 rounded-full" width={32} height={32} />
                <div>
                  <div className="font-semibold text-gray-900 text-base">{filteredTestimonials[1].name}</div>
                  <div className="text-sm text-gray-500">{filteredTestimonials[1].role}</div>
                </div>
                {filteredTestimonials[1].logo && (
                  <Image src={filteredTestimonials[1].logo} alt="logo" className="w-5 h-5 ml-2 opacity-70" width={20} height={20} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
        {/* Bottom middle card */}
        {filteredTestimonials[2] && (
          <div className="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out p-6 flex flex-col justify-between md:col-start-2 md:row-start-2">
            <div>
              <div className="text-3xl text-red-500 mb-2">&rdquo;</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={filteredTestimonials[2].quote + filteredTestimonials[2].name}
                  variants={fadeAnim}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-gray-700 text-lg mb-4"
                >
                  {filteredTestimonials[2].quote}
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={filteredTestimonials[2].name + filteredTestimonials[2].role}
                variants={fadeAnim}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex items-center gap-3 mt-auto"
              >
                <Image src={filteredTestimonials[2].avatar} alt={filteredTestimonials[2].name} className="w-8 h-8 rounded-full" width={32} height={32} />
                <div>
                  <div className="font-semibold text-gray-900 text-base">{filteredTestimonials[2].name}</div>
                  <div className="text-sm text-gray-500">{filteredTestimonials[2].role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
        {/* Bottom right card (purple) */}
        {filteredTestimonials[3] && (
          <div className="bg-purple-200 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out p-6 flex flex-col justify-between text-gray-900 md:col-start-3 md:row-start-2">
            <div>
              <div className="text-3xl text-red-400 mb-2">&rdquo;</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={filteredTestimonials[3].quote + filteredTestimonials[3].name}
                  variants={fadeAnim}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="mb-4 text-gray-600 text-lg"
                >
                  {filteredTestimonials[3].quote}
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={filteredTestimonials[3].name + filteredTestimonials[3].role}
                variants={fadeAnim}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex items-center gap-3 mt-auto"
              >
                <Image src={filteredTestimonials[3].avatar} alt={filteredTestimonials[3].name} className="w-8 h-8 rounded-full" width={32} height={32} />
                <div>
                  <div className="font-semibold text-gray-700 text-base">{filteredTestimonials[3].name}</div>
                  <div className="text-sm text-gray-500">{filteredTestimonials[3].role}</div>
                </div>
                {filteredTestimonials[3].logo && (
                  <Image src={filteredTestimonials[3].logo} alt="logo" className="w-5 h-5 ml-2 opacity-70" width={20} height={20} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default SocialProof;