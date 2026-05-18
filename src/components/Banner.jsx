"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import styles from "../styles/SwiperAnimations.module.css";

const Banner = () => {
  const [slides, setSlides] = useState([]);

  // Fetch banner data
  useEffect(() => {
    fetch("/banner.json")
      .then((res) => res.json())
      .then((data) => setSlides(data));
  }, []);

  if (slides.length === 0) {
    return (
      <div className="h-[75vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className={`${styles.bannerSwiper} h-[75vh]`}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[75vh] bg-cover bg-center bg-no-repeat relative"
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
                    <Link href="/all-tiles">
                      <Button color="primary">Browse Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;