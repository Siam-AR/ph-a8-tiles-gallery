"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Banner = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch banner data
  useEffect(() => {
    fetch("/banner-data.json")
      .then((res) => res.json())
      .then((data) => setSlides(data));
  }, []);

  // Auto slide
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) {
    return (
      <div className="h-[75vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <div
      className="h-[75vh] bg-cover bg-center bg-no-repeat relative rounded-xl overflow-hidden my-5"
      style={{
        backgroundImage: `url(${slide.image})`,
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 flex items-center"
        style={{
          backgroundColor: `rgba(0,0,0,${slide.overlayOpacity})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-6xl font-bold whitespace-pre-line mb-4">
            {slide.title}
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mb-6 text-gray-200">
            {slide.description}
          </p>

          <div className="flex gap-4">
            <Link href={"/all-tiles"}>
              <Button color="primary">Browse Now</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;