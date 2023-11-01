import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useSelector } from "react-redux";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort(
      (a, b) => b.discountPrice - a.discountPrice
    );
    const firstFive = sortedData && sortedData.slice(0, 20);
    setData(firstFive);
  }, [allProducts]);

  const [showLeftScroll, setShowLeftScroll] = useState(true);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const handleScroll = (event) => {
    const container = event.currentTarget;
    const buffer = 10; // Adjust this value as needed
    const isAtEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - buffer;

    setShowRightScroll(!isAtEnd);

    const isAtStart = container.scrollLeft === 0;
    setShowLeftScroll(!isAtStart);
  };

  const scrollDeals = (direction) => {
    const container = document.querySelector(".scroll-container");
    if (container) {
      const newScrollLeft = container.scrollLeft + direction;

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      const isAtEnd =
        newScrollLeft + container.clientWidth >= container.scrollWidth;
      setShowRightScroll(!isAtEnd);
    }
  };

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading} !pb-0 !text-left`}>
        <h1 className="font-bold text-base sm:text-lg md:text-2xl mt-10 bg-black p-2 text-white">
          Deals you can't miss
        </h1>
      </div>
      {data.length !== 0 && (
        <div className="relative group">
          <div
            className="pt-2 scroll-container overflow-x-auto scrollbar-hide"
            onScroll={handleScroll}
          >
            <div className="flex flex-nowrap space-x-1 sm:space-x-5">
              {data.map((d, index) => (
                <ProductCard data={d} key={index} className />
              ))}
            </div>
          </div>
          {showLeftScroll && (
            <button
              className="absolute group-hover:sm:block hidden z-50 -left-4 top-1/2 hover:opacity-80 transition bg-white/95 border border-[#003b95] rounded-full p-2"
              onClick={() => scrollDeals(-350)}
            >
              <BsChevronLeft size={25} className="text-blue-400" />
            </button>
          )}
          {showRightScroll && (
            <button
              className="absolute group-hover:sm:block hidden z-50 -right-4 top-1/2 hover:opacity-80 transition bg-white/95 border border-[#003b95] rounded-full p-2"
              onClick={() => scrollDeals(350)}
            >
              <BsChevronRight size={25} className="text-blue-400" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BestDeals;
