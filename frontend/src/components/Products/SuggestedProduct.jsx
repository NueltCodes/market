import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const SuggestedProduct = ({ data }) => {
  const [products, setProducts] = useState(null);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const d = allProducts && allProducts.filter((i) => i.tags === data.tags);
    setProducts(d);
  }, [allProducts, data.tags]);

  const [showLeftScroll6, setShowLeftScroll6] = useState(true);
  const [showRightScroll6, setShowRightScroll6] = useState(true);

  const handleScroll6 = (event) => {
    const container = event.currentTarget;
    const buffer = 10; // Adjust this value as needed
    const isAtEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - buffer;

    setShowRightScroll6(!isAtEnd);

    const isAtStart = container.scrollLeft === 0;
    setShowLeftScroll6(!isAtStart);
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
      setShowRightScroll6(!isAtEnd);
    }
  };

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-sm  800px:text-[25px] font-[500] border-b `}
          >
            Related Product
          </h2>
          <div className="relative group">
            <div
              className="scroll-container1 overflow-x-auto scrollbar-hide"
              onScroll={handleScroll6}
            >
              <div className="flex flex-nowrap space-x-1 sm:space-x-5">
                {products &&
                  products.map((i, index) => (
                    <ProductCard
                      data={i}
                      key={index}
                      className
                      onClick={() => window.scrollTo(0, 0)}
                    />
                  ))}
              </div>
            </div>
            {products && products.length > 3 && showLeftScroll6 && (
              <button
                className="absolute group-hover:sm:block hidden z-50 -left-4 top-1/2 hover:opacity-80 transition bg-white/95 border border-[#003b95] rounded-full p-2"
                onClick={() => scrollRated(-350)}
              >
                <BsChevronLeft size={25} className="text-blue-400" />
              </button>
            )}
            {products && products.length > 3 && showRightScroll6 && (
              <button
                className="absolute group-hover:sm:block hidden z-50 -right-4 top-1/2 hover:opacity-80 transition bg-white/95 border border-[#003b95] rounded-full p-2"
                onClick={() => scrollRated(350)}
              >
                <BsChevronRight size={25} className="text-blue-400" />
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
