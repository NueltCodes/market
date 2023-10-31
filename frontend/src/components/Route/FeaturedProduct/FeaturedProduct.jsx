import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);
  const listingsRef = useRef(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(
    allProducts && allProducts?.length / itemsPerPage
  );
  const listingsToShow = allProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className={`${styles.section} mb-5`}>
        <div className={`${styles.heading} !pb-0 !text-left`}>
          <h1
            className="font-bold text-base sm:text-lg md:text-2xl mt-5"
            ref={listingsRef}
          >
            Featured Products
          </h1>
        </div>

        <div className="relative w-full">
          <div
            className="pt-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 "
            // onScroll={handleScroll2}
          >
            {listingsToShow &&
              listingsToShow.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 ">
            {currentPage > 1 && (
              <button
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                  if (listingsRef.current) {
                    listingsRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="cursor-pointer flex items-center gap-1 text-[#003b95] group"
              >
                <BiChevronLeft className="transition transform group-hover:-translate-x-2 h-5 w-5" />{" "}
                Previous
              </button>
            )}

            {[...Array(totalPages).keys()].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => {
                    setCurrentPage(pageNumber);
                    if (listingsRef.current) {
                      listingsRef.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={` ${
                    pageNumber === currentPage
                      ? "bold flex gap-4 bg-[#003b95] rounded-lg  text-white"
                      : "normal"
                  }  cursor-pointer shadow-md px-2 py-1 `}
                >
                  {pageNumber}
                </button>
              );
            })}

            {currentPage < totalPages && (
              <button
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  if (listingsRef.current) {
                    listingsRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="cursor-pointer flex items-center gap-1 text-[#003b95] group"
              >
                Next
                <BiChevronRight className="transition transform group-hover:translate-x-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
