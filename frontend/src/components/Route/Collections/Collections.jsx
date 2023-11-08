import React, { useState } from "react";
import styles from "../../../styles/styles";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { categories } from "../../../static/data";
import { useNavigate } from "react-router-dom";

const Collections = () => {
  const [showLeftScroll5, setShowLeftScroll5] = useState(true);
  const [showRightScroll5, setShowRightScroll5] = useState(true);
  const navigate = useNavigate();

  const handleScroll1 = (event) => {
    const container = event.currentTarget;
    const buffer = 10; // Adjust this value as needed
    const isAtEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - buffer;

    setShowRightScroll5(!isAtEnd);

    const isAtStart = container.scrollLeft === 0;
    setShowLeftScroll5(!isAtStart);
  };

  const scrollRated = (direction) => {
    const container = document.querySelector(".scroll-container5");
    if (container) {
      const newScrollLeft = container.scrollLeft + direction;

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      const isAtEnd =
        newScrollLeft + container.clientWidth >= container.scrollWidth;
      setShowRightScroll5(!isAtEnd);
    }
  };

  const handleSubmit = (data) => {
    navigate(`/products?category=${data.link}`);
  };

  return (
    <div className="mt-5 bg-black w-full items-center justify-center py-5">
      <div className={`${styles.section} bg-white !mt-0`}>
        <div className={`${styles.heading} !pb-0 !text-left`}>
          <h1 className="font-bold text-base sm:text-lg md:text-2xl mt-5 bg-black p-2 text-white">
            More collections
          </h1>
        </div>
        <div className="relative group">
          <div
            className="pt-2 scroll-container5 overflow-x-auto scrollbar-hide"
            onScroll={handleScroll1}
          >
            <div className="flex flex-nowrap space-x-1 sm:space-x-5 m-1">
              {categories.map((data, index) => (
                <img
                  src={data.image}
                  alt={data.name}
                  className="h-[30%] w-[30%] cursor-pointer"
                  onClick={() => handleSubmit(data)}
                />
              ))}
            </div>
          </div>{" "}
          {showLeftScroll5 && (
            <button
              className="absolute group-hover:sm:block hidden z-50 -left-4 top-1/2 hover:opacity-80 transition bg-white/95 border border-[#003b95] rounded-full p-2"
              onClick={() => scrollRated(-350)}
            >
              <BsChevronLeft size={25} className="text-blue-400" />
            </button>
          )}
          {showRightScroll5 && (
            <button
              className="absolute group-hover:sm:block hidden z-50 -right-4 top-1/2 hover:opacity-80 transition bg-white/95 border border-[#003b95] rounded-full p-2"
              onClick={() => scrollRated(350)}
            >
              <BsChevronRight size={25} className="text-blue-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
