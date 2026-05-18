"use client";

import Marquee from "react-fast-marquee";

const MarqueeComponent = () => {
  return (
    <div className="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] py-3 md:py-4 my-2 md:my-3 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 border-y border-slate-700">
      <Marquee
        speed={50}
        pauseOnHover
        gradient
        gradientColor="rgb(15, 23, 42)"
      >
        <div className="flex items-center gap-4 md:gap-8 px-4 md:px-8 text-white">
          
          <span className="text-xs md:text-sm font-semibold text-cyan-400 whitespace-nowrap">
            ✨ New Arrivals:
          </span>

          <span className="text-xs md:text-sm text-slate-300 whitespace-nowrap">
            Ceramic Blue | Marble White | Hexagonal Mosaic
          </span>

          <span className="text-xs md:text-sm font-semibold text-pink-400 whitespace-nowrap">
            📌 Weekly Feature:
          </span>

          <span className="text-xs md:text-sm text-slate-300 whitespace-nowrap">
            Modern Patterns | Luxury Collections | Minimalist Finishes
          </span>

          <span className="text-xs md:text-sm font-semibold text-amber-400 whitespace-nowrap">
            🌟 Join Community:
          </span>

          <span className="text-xs md:text-sm text-slate-300 whitespace-nowrap">
            Share Designs | Trending Tiles | Premium Collections
          </span>

        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeComponent;