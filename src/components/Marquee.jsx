"use client";

import Marquee from "react-fast-marquee";

const MarqueeComponent = () => {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-4 my-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-y border-slate-700">
      <Marquee
        speed={60}
        pauseOnHover
        gradient
        gradientColor="rgb(15, 23, 42)"
      >
        <div className="flex items-center gap-8 px-8 text-white">
          
          <span className="text-sm font-semibold text-cyan-400">
            ✨ New Arrivals:
          </span>

          <span className="text-sm text-slate-300">
            Ceramic Blue Tile | Marble Elegance White | Hexagonal Mosaic Blue
          </span>

          <span className="text-sm font-semibold text-pink-400">
            📌 Weekly Feature:
          </span>

          <span className="text-sm text-slate-300">
            Modern Geometric Patterns | Luxury Bathroom Collections | Minimalist Matte Finishes
          </span>

          <span className="text-sm font-semibold text-amber-400">
            🌟 Join the Community:
          </span>

          <span className="text-sm text-slate-300">
            Share Your Interior Designs | Discover Trending Tiles | Explore Premium Collections
          </span>

        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeComponent;