import React from "react";
import { useLottie } from "lottie-react";
import animationData from "../../Assests/animations/24151-ecommerce-animation.json";

const Loader = () => {
  const options = {
    animationData: animationData,
    loop: true,
    // autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {View}
    </div>
  );
};

export default Loader;
