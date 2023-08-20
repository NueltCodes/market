import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const heroImages = [
  {
    image: require("../../../Assests/images/Desktop_Homepage_Slider__712x384.jpg"),
  },
  {
    image: require("../../../Assests/images/Desktop_Homepage_Slider__712x384.png"),
  },
  {
    image: require("../../../Assests/images/Desktop_homepage_slider__712x384_(Shop_Now).jpg"),
  },
  {
    image: require("../../../Assests/images/frankie-lg35FkimT30-unsplash.jpg"),
  },
  { image: require("../../../Assests/images/gallery02.jpg") },
  { image: require("../../../Assests/images/gallery07.jpg") },
  { image: require("../../../Assests/images/Game-collection-Slider.jpg") },
  {
    image: require("../../../Assests/images/istockphoto-1282840252-612x612.jpg"),
  },
  {
    image: require("../../../Assests/images/marko-blazevic-rMCwWG2kSyU-unsplash.jpg"),
  },
  {
    image: require("../../../Assests/images/tamanna-rumee-lpGm415q9JA-unsplash.jpg"),
  },
];

const Hero = () => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:h-[680px] h-[300px] relative bg-cover">
      <div className="absolute top-0 left-0 w-full h-full transition-opacity z-0">
        {heroImages.map((image, index) => (
          <img
            key={index}
            alt="hero"
            src={image.image}
            className={`${
              imageIndex === index ? "opacity-100" : "opacity-0"
            } transition-all duration-1000 absolute top-0 left-0 w-full h-full object-cover`}
          />
        ))}
      </div>

      <div className="h-full w-full flex flex-col justify-end items-center text-center">
        <div
          className="font-bold rounded md:p-2 p-1 text-lg md:mb-16 sm:text-2xl lg:text-4xl text-white sm:max-w-xl max-w-xs"
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div>
            Explore our endless collections on{" "}
            <span className="text-red-600">E•</span>Store
          </div>
          <Link to="/products" className="inline-block">
            <div className={`${styles.button} !w-[120px] `}>
              <span className="text-[#fff] font-[Poppins] text-[18px]">
                Shop Now
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
