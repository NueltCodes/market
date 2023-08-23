import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useSelector } from "react-redux";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

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

  const [showRightScroll, setShowRightScroll] = useState(true);

  const handleScroll = (scrollOffset) => {
    const container = document.querySelector(".best-deals-scroll");
    if (container) {
      const newScrollLeft = container.scrollLeft + scrollOffset;

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      const isAtEnd =
        newScrollLeft + container.clientWidth >= container.scrollWidth;
      setShowRightScroll(!isAtEnd);
    }
  };

  const scrollContainerStyle = {
    display: "flex",
    width: "100%",
    overflowX: "scroll",
    gap: "20px",
  };

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading} !text-left`}>
        <h1>Best Deals</h1>
      </div>
      {data.length !== 0 && (
        <div className="relative">
          <div
            className="best-deals-scroll scrollbar-hide"
            style={scrollContainerStyle}
            // onScroll={handleScroll}
          >
            {data.map((d, index) => (
              <ProductCard data={d} key={index} />
            ))}
          </div>
          <button
            className="absolute -left-6 top-1/2 hover:opacity-80 transition"
            onClick={() => handleScroll(-200)}
          >
            <AiFillCaretLeft size={30} color="grey" />
          </button>
          {showRightScroll && (
            <button
              className="absolute -right-6 top-1/2 hover:opacity-80 transition"
              onClick={() => handleScroll(200)}
            >
              <AiFillCaretRight size={30} color="grey" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BestDeals;
