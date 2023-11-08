import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useSelector } from "react-redux";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Trending = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const trendingProduct = allProductsData.filter(
      (product) => product.sold_out > 2
    );
    const sortedData = trendingProduct?.sort((a, b) => b.rating - a.rating);
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

  const scrollTrend = (direction) => {
    const container = document.querySelector(".scroll-container0");
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
    <div className=" bg-black w-full items-center justify-center py-5">
      <div
        className={`${styles.section} bg-gradient-to-r from-blue-500 to-green-500 !mt-0`}
      >
        <div className={`${styles.heading} !pb-0 !text-left`}>
          <h1 className="font-bold text-base sm:text-lg md:text-2xl mt-5 bg-black p-2 text-white">
            All they want & more
          </h1>
        </div>
        {data.length !== 0 && (
          <div className="relative group">
            <div
              className="pt-2 scroll-container0 overflow-x-auto scrollbar-hide"
              onScroll={handleScroll1}
            >
              <div className="flex flex-nowrap space-x-1 sm:space-x-5">
                {data.map((d, index) => (
                  <ProductCard data={d} key={index} trending />
                ))}
              </div>
            </div>{" "}
            {data && data.length > 3 && showLeftScroll1 && (
              <button
                className="absolute group-hover:sm:block hidden z-50 -left-4 top-1/2 hover:opacity-80 transition bg-white/95 border border-[#003b95] rounded-full p-2"
                onClick={() => scrollTrend(-350)}
              >
                <BsChevronLeft size={25} className="text-blue-400" />
              </button>
            )}
            {data && data.length > 3 && showRightScroll1 && (
              <button
                className="absolute group-hover:sm:block hidden z-50 -right-4 top-1/2 hover:opacity-80 transition bg-white/95 border border-[#003b95] rounded-full p-2"
                onClick={() => scrollTrend(350)}
              >
                <BsChevronRight size={25} className="text-blue-400" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;
