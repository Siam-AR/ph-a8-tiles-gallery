"use client";

import Lottie from "lottie-react";
import animationData from "../../public/animations/login-registration.json";

const AuthAnimation = () => {
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