import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import Lottie from "lottie-react";
import AnimateCart from "../../../Assests/animations/shopping.json";
import { useMediaQuery } from "react-responsive";

const heroImages = [
  {
    image: require("../../../Assests/images/Desktop_Homepage_Slider__712x384.jpg"),
  },
  {
    image: require("../../../Assests/images/Desktop_Homepage_Slider__712x384.png"),
  },

  {
    image: require("../../../Assests/images/dannie-sorum-xU-81R6CAVE-unsplash.jpg"),
  },
  {
    image: require("../../../Assests/images/jan-bottinger--kChshW17rw-unsplash.jpg"),
  },
  {
    image: require("../../../Assests/images/planetcare-5cpBWEl6y6c-unsplash.jpg"),
  },
  {
    image: require("../../../Assests/images/sebastiaan-stam-5hBREM-5mnQ-unsplash.jpg"),
  },
  {
    image: require("../../../Assests/images/arturo-rey-5yP83RhaFGA-unsplash.jpg"),
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
  const [cart, setCart] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <div className="md:h-[680px] h-[300px] relative bg-cover">
      <div className="absolute top-0 left-0 w-full h-full transition-opacity z-0">
        {heroImages.map((image, index) => (
          <>
            <img
              key={index}
              alt="hero"
              src={image.image}
              className={`${
                imageIndex === index ? "opacity-100" : "opacity-0"
              } transition-all duration-1000 absolute top-0 left-0 w-full h-full object-cover`}
            />
            <div className="absolute rounded-md bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/10 to-black/20"></div>
          </>
        ))}
      </div>

      <div className="h-full w-full flex flex-col justify-end items-center text-center">
        <div
          className="font-bold max-w-[200px] rounded md:p-2 p-1 text-lg md:mb-16 mb-7 sm:text-2xl lg:text-4xl text-white sm:max-w-xl "
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            className="sm:text-xl  text-sm"
            style={{
              textShadow: "-1px 0 gray, ",
            }}
          >
            Explore our endless collections on{" "}
            <span
              className="text-red-600"
              style={{
                textShadow: "-1px 0 gray, ",
              }}
            >
              M•
            </span>
            arket
          </div>
          <Link to="/products" className="inline-block">
            <div
              className={`${styles.button} !w-[120px] sm:!w-[180px] !my-0 !mt-3 `}
              onMouseEnter={() => setCart(true)}
              onMouseLeave={() => setCart(false)}
            >
              <span className="text-[#fff] font-[Poppins] sm:text-lg text-sm">
                Shop Now{" "}
              </span>
              {cart ? (
                <Lottie
                  animationData={AnimateCart}
                  loop={false}
                  autoplay
                  style={
                    isSmallScreen
                      ? { height: 35, width: 35 }
                      : { height: 60, width: 60 }
                  }
                />
              ) : (
                <Lottie
                  animationData={AnimateCart}
                  loop
                  autoplay
                  style={
                    isSmallScreen
                      ? { height: 35, width: 35 }
                      : { height: 60, width: 60 }
                  }
                />
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
