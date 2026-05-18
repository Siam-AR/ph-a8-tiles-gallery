"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import styles from "../styles/SwiperAnimations.module.css";

const Banner = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch banner data
  useEffect(() => {
    let mounted = true;

    async function loadBanner() {
      try {
        const res = await fetch("/banner.json");
        const data = await res.json();

        // Preload images
        const urls = data.map((s) => s.image).filter(Boolean);
        await Promise.all(
          urls.map(
            (u) =>
              new Promise((resolve) => {
                const img = new Image();
                img.src = u;
                img.onload = img.onerror = () => resolve(null);
              }),
          ),
        );

        if (mounted) {
          setSlides(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load banner", err);
        if (mounted) setLoading(false);
      }
    }

    loadBanner();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="h-[75vh]">
        <Loader message="Loading banner…" />
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
        className={`${styles.bannerSwiper} h-[50vh] sm:h-[60vh] md:h-[75vh]`}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[50vh] sm:h-[60vh] md:h-[75vh] bg-cover bg-center bg-no-repeat relative"
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-white">
                  <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold whitespace-pre-line mb-2 sm:mb-4">
                    {slide.title}
                  </h1>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mb-4 sm:mb-6 text-gray-200">
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