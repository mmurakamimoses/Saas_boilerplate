"use client";
import Image from 'next/image'

const Problem = () => {
  return (
    <div className="relative bg-[#FDF7F2] pb-10">
      <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-20">
        {/* Card containing title, subtitle, and issues */}
        <div className="bg-[#f7cb55] rounded-[100px] shadow-lg p-12 py-8">
          {/* Title Section */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold leading-none  tracking-tight text-gray-900">
              Most Supplements Aren&apos;t What They Claim
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 font-normal mt-4 max-w-3xl mx-auto leading-tight">
            If there&apos;s one thing athletes, moms, biohackers, and nerds agree on — it&apos;s that supplement transparency sucks. Like, really sucks.
            </p>
          </div>
          <div className="relative mx-auto h-92 w-full">
                    <Image
                        src="/auth-bg.png"
                        alt="Supplements Background"
                        fill
                        className="object-cover rounded-2xl"
                        priority
                    />
                </div>

        </div>
      </div>
    </div>
  );
};

export default Problem;