"use client"
import React, { useState } from "react";
import UploadCard from "./UploadCard";
import Image from "next/image";

const pricingCards = [
  {
    bg: "bg-blue-100 border border-blue-200",
    title: "Free",
    titleClass: "text-blue-800",
    subtitle: "For thoes just dabbling.",
    features: [
      {
        title: "Verified Shopping Links",
      },
      {
        title: "Ingredient Breakdown"
      },
      {
        title: "Quality Indicators",
        subfeatures: [
          "Organic",
          "Non-GMO",
          "No Artifical Falvoring and Coloring"
        ]
      },
      {
        title: "Compliance Indicators",
        subfeatures: [
          "Third-party Tested",
          "Public Batch Spesific COAS",
          "CGMP compliant manufacturing practices"
        ]
      },
      {
        title: "Open Souce Testing Data",
        subfeatures: [
          "Potency, Heavy Metals, BPA/BPA, etc",
          <i key="open-data-note">Open data is limited, but we&apos;re always digging for more.</i>,
        ]
      },
    ],
    price: "$0",
    priceClass: "text-blue-800",
    button: "Browse Now",
    buttonClass: "bg-blue-700 text-white",
    moClass: "text-blue-800",
  },
  {
    bg: "bg-pink-100 border border-pink-200",
    title: "Premium",
    titleClass: "text-yellow-900",
    subtitle: "For doctors, nutritionists, athletes and those who want the deepest insights.",
    features: [
      {
        title: "Everything in Free +",
      },
      {
        title: "Independent testing done by our ISO 17502 certified community labs.",
        subfeatures: [
            "Access to indepedent lab tests for 100+ products so you can make the best decisions for your health.",
            "Early access to new testing reports and data."
          ]
          
      },

    ],
    yearlyPrice: "$79",
    lifetimePrice: "$299",
    priceClass: "text-yellow-900",
    button: "Choose Premium",
    buttonClass: "bg-yellow-700 text-white",
    moClass: "text-yellow-900",
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState("yearly");
  // Removed showUploadCard state

  const getPrice = (card: typeof pricingCards[number]) => {
    if (card.title === "Free") {
      return { price: card.price, period: "/month" };
    }
    if (billing === "yearly") {
      return { price: card.yearlyPrice, period: "/year" };
    } else {
      return { price: card.lifetimePrice, period: "/lifetime access" };
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center bg-purple-200 px-4 py-8">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold leading-none tracking-tight text-gray-900 mb-2 text-center">How We Keep it Transparent</h2>
        <p className="text-xl md:text-2xl text-gray-700 font-normal leading-tight text-center mb-6">Free data for everyone. Premium unlocks exclusive lab testing and expert insights.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {/* Left column: Pick your plan and billing toggle */}
          <div className="flex flex-col items-start justify-between bg-transparent rounded-xl shadow-none p-8 h-full">
            <div>
              <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 text-left w-full">Pick your plan</h3>
              <div className="flex flex-col gap-4 w-full max-w-xs">
                {/* Monthly billing */}
                <label className="flex items-center cursor-pointer gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-black">
                    {billing === "yearly" && <span className="block w-3 h-3 bg-black rounded-full" />}
                  </span>
                  <span className="text-lg text-black font-medium select-none">Yearly billing</span>
                  <input
                    type="radio"
                    name="billing"
                    value="yearly"
                    checked={billing === "yearly"}
                    onChange={() => setBilling("yearly")}
                    className="hidden"
                  />
                </label>
                {/* Yearly billing */}
                <label className="flex items-center cursor-pointer gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-black">
                    {billing === "Life-time" && <span className="block w-3 h-3 bg-black rounded-full" />}
                  </span>
                  <span className="text-lg text-black font-medium select-none">Lifetime access!</span>
                  <span className="ml-2 text-orange-500 bg-orange-100 rounded px-2 py-0.5 text-xs font-semibold">Most Popular</span>
                  <input
                    type="radio"
                    name="Life-time"
                    value="Life-time"
                    checked={billing === "Life-time"}
                    onChange={() => setBilling("Life-time")}
                    className="hidden"
                  />
                </label>
                {/* Upload lab test option as radio */}
                <label className="flex items-start cursor-pointer gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 min-w-[1.5rem] min-h-[1.5rem] rounded-full border-2 border-black flex-shrink-0">
                    {billing === "upload" && (
                      <span className="block w-3 h-3 bg-black rounded-full" />
                    )}
                  </span>
                  <span className="text-lg text-black font-medium select-none leading-normal">Upload a lab test to get free access</span>
                  <input
                    type="radio"
                    name="billing"
                    value="upload"
                    checked={billing === "upload"}
                    onChange={() => setBilling("upload")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="w-full -mb-16">
              <Image src="/glass.png" alt="Glass" className="w-3/4 h-auto mx-auto" width={400} height={200} />
            </div>
          </div>
          {/* Middle and right cards */}
          {billing !== "upload" ? (
            pricingCards.map((card, i) => {
              const priceInfo = getPrice(card);
              return (
                <div key={i} className={`${card.bg} rounded-xl shadow-sm p-6 flex flex-col transition-opacity duration-500 min-h-[670px]`}>
                  <h3 className={`text-2xl md:text-3xl font-semibold ${card.titleClass}`}>{card.title}</h3>
                  <div className={`font-semibold mb-1 min-h-[40px] ${card.titleClass}`}>{card.subtitle}</div>
                  <ul className="space-y-2">
                    {card.features && card.features.map((feature, idx) => (
                      <li key={idx}>
                        <div className="flex items-start gap-2 text-base text-gray-800">
                          <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          <span>{feature.title}</span>
                        </div>
                        {feature.subfeatures && (
                          <ul className="ml-8 space-y-1 pt-2">
                            {feature.subfeatures.map((sub, subIdx) => (
                              <li key={typeof sub === 'string' ? `${subIdx}-${sub}` : `element-${subIdx}`} className="text-md text-gray-600 flex items-start gap-2 ">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full block flex-shrink-0 self-start" />
                                <span>{sub}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <div className="flex items-end mb-2">
                      <span className={`text-4xl font-bold mr-1 ${card.priceClass}`}>{priceInfo.price}</span>
                      {priceInfo.period && <span className={`text-lg font-medium ${card.moClass}`}>{priceInfo.period}</span>}
                    </div>
                    <button className={`w-full rounded-lg py-2 font-semibold text-lg mb-2 ${card.buttonClass}`}>{card.button}</button>
                  </div>
                </div>
              );
            })
          ) : (
            <UploadCard />
          )}
        </div>
      </div>
    </section>
  );
}