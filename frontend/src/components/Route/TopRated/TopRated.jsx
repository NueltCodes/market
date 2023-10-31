import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useSelector } from "react-redux";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const TopRated = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const ratedProducts = allProductsData.filter(
      (product) => product.ratings > 2.5
    );
    const sortedData = ratedProducts?.sort((a, b) => b.rating - a.rating);
    const firstFive = sortedData && sortedData.slice(0, 20);
    setData(firstFive);
  }, [allProducts]);

  const [showLeftScroll1, setShowLeftScroll1] = useState(true);
  const [showRightScroll1, setShowRightScroll1] = useState(true);

  const handleScroll1 = (event) => {
    const container = event.currentTarget;
    const buffer = 10; // Adjust this value as needed
    const isAtEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - buffer;

    setShowRightScroll1(!isAtEnd);

    const isAtStart = container.scrollLeft === 0;
    setShowLeftScroll1(!isAtStart);
  };

  const scrollRated = (direction) => {
    const container = document.querySelector(".scroll-container1");
    if (container) {
      const newScrollLeft = container.scrollLeft + direction;

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      const isAtEnd =
        newScrollLeft + container.clientWidth >= container.scrollWidth;
      setShowRightScroll1(!isAtEnd);
    }
  };
  return (
    <div className={`${styles.section} !mt-0`}>
      <div className={`${styles.heading} !pb-0 !text-left`}>
        <h1 className="font-bold text-base sm:text-lg md:text-2xl mt-5">
          Top Rated
        </h1>
      </div>
      {data.length !== 0 && (
        <div className="relative group">
          <div
            className="pt-2 scroll-container1 overflow-x-auto scrollbar-hide"
            onScroll={handleScroll1}
          >
            <div className="flex flex-nowrap space-x-1 sm:space-x-5">
              {data.map((d, index) => (
                <ProductCard data={d} key={index} className />
              ))}
            </div>
          </div>{" "}
          {showLeftScroll1 && (
            <button
              className="absolute group-hover:sm:block hidden z-50 -left-4 top-1/2 hover:opacity-80 transition bg-white/95 border border-[#003b95] rounded-full p-2"
              onClick={() => scrollRated(-350)}
            >
              <BsChevronLeft size={25} className="text-blue-400" />
            </button>
          )}
          {showRightScroll1 && (
            <button
              className="absolute group-hover:sm:block hidden z-50 -right-4 top-1/2 hover:opacity-80 transition bg-white/95 border border-[#003b95] rounded-full p-2"
              onClick={() => scrollRated(350)}
            >
              <BsChevronRight size={25} className="text-blue-400" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TopRated;
