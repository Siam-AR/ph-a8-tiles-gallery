"use client";

import Lottie from "lottie-react";
import animationData from "../../public/animations/login-registration.json";
import { useEffect, useState } from "react";

const AuthAnimation = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if screen is mobile or tablet (< 1024px which is lg breakpoint)
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Don't render animation on mobile/tablet devices
  if (!isMounted || isMobile) return null;

  return (
    <div className="w-full max-w-md mx-auto">
      <Lottie
        animationData={animationData}
        loop={true}
        className="w-full h-full"
      />
    </div>
  );
};

export default AuthAnimation;