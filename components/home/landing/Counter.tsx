import React from 'react'
import Image from 'next/image'

const Counter = () => {
  return (
    <div className='bg-purple-200'>
      <div className="flex gap-4 p-8">
        {/* Title and Subtitle */}
        <div className="flex-1 flex flex-col justify-start pr-8 max-w-md pl-0 xl:pl-20">
          <h2 className="text-4xl md:text-5xl font-bold leading-none tracking-tight text-gray-900 mb-4">Independence by Design</h2>
          <p className="text-xl md:text-2xl text-gray-700 font-normal leading-tight">We exist to verify, not to sell. Every data point is third-party sourced and bias-free.</p>
        </div>

        {/* Box 1 - Pastel Blue */}
        <div className="flex-1 bg-blue-100 p-4 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col max-w-sm">
          <div className="flex-1 flex flex-col justify-start items-center text-center pt-2">
            <h3 className="text-xl md:text-2xl text-gray-700 font-normal leading-tight mb-3">Nothing is<br />more neutral</h3>
            <p className="text-gray-600 text-lg font-light">No, we don&apos;t sell our own supplements.</p>
          </div>
          <div className="mt-4 relative w-full h-32">
            <Image src="/auth-bg.png" alt="Neutral" fill className="object-cover rounded border-2 border-black" />
          </div>
        </div>

        {/* Box 2 - Pastel Pink */}
        <div className="flex-1 bg-pink-100 p-4 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col max-w-sm">
          <div className="flex-1 flex flex-col justify-start items-center text-center pt-2">
            <h3 className="text-xl md:text-2xl text-gray-700 font-normal leading-tight mb-3">Nothing is<br />less biased</h3>
            <p className="text-gray-600 text-lg font-light">No sponsorships. No pay-to-play.</p>
          </div>
          <div className="mt-4 relative w-full h-32">
            <Image src="/auth-bg.png" alt="Unbiased" fill className="object-cover rounded border-2 border-black" />
          </div>
        </div>

        {/* Box 3 - Pastel Green */}
        <div className="flex-1 bg-green-100 p-4 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col max-w-sm">
          <div className="flex-1 flex flex-col justify-start items-center text-center pt-2">
            <h3 className="text-xl md:text-2xl text-gray-700 font-normal leading-tight mb-3">Nothing is<br />more independent</h3>
            <p className="text-gray-600 text-lg font-light">All data comes from verified third-party testing labs.</p>
          </div>
          <div className="mt-4 relative w-full h-32">
            <Image src="/auth-bg.png" alt="Independent" fill className="object-cover rounded border-2 border-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;