import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import Ratings from "../Ratings";
import { getAllEventsShop } from "../../redux/actions/event";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [leftScroll, setLeftScroll] = useState(true);
  const [rightScroll, setRightScroll] = useState(true);

  const handleScroll1 = (event) => {
    const container = event.currentTarget;
    const buffer = 10; // Adjust this value as needed
    const isAtEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - buffer;

    setRightScroll(!isAtEnd);

    const isAtStart = container.scrollLeft === 0;
    setLeftScroll(!isAtStart);
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
      setRightScroll(!isAtEnd);
    }
  };

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch]);

  const [active, setActive] = useState(1);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-semibold text-[14px] sm:text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-semibold text-[14px] sm:text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Events
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-semibold text-[14px] sm:text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div
                  className={`${styles.button} !w-[100px] !rounded-[4px] !h-[35px]`}
                >
                  <span className="text-[#fff]">Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <br />
      {active === 1 && (
        <>
          <div className="relative group">
            <div
              className="pt-2 scroll-container1 overflow-x-auto scrollbar-hide"
              onScroll={handleScroll1}
            >
              <div className="flex flex-nowrap space-x-1 sm:space-x-5">
                {products &&
                  products.map((i, index) => (
                    <ProductCard data={i} key={index} isShop={true} className />
                  ))}
              </div>
            </div>
            {leftScroll && (
              <button
                className="absolute group-hover:sm:block hidden z-50 -left-4 top-1/2 hover:opacity-80 transition bg-white/95 border border-[#003b95] rounded-full p-2"
                onClick={() => scrollRated(-350)}
              >
                <BsChevronLeft size={25} className="text-blue-400" />
              </button>
            )}
            {rightScroll && (
              <button
                className="absolute group-hover:sm:block hidden z-50 -right-4 top-1/2 hover:opacity-80 transition bg-white/95 border border-[#003b95] rounded-full p-2"
                onClick={() => scrollRated(350)}
              >
                <BsChevronRight size={25} className="text-blue-400" />
              </button>
            )}
          </div>
          <>
            {products && products.length === 0 && (
              <h5 className="w-full text-center py-5 text-[18px]">
                {isOwner
                  ? "You are yet to create a product"
                  : "No Available product yet for this seller!"}
              </h5>
            )}
          </>
        </>
      )}

      {active === 2 && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {events &&
              events.map((i, index) => (
                <ProductCard
                  data={i}
                  key={index}
                  isShop={true}
                  isEvent={true}
                />
              ))}
          </div>
          {events && events.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              {isOwner
                ? "You are yet to create an event where you get to set timer for a product "
                : " No active Events yet for this shop!"}
            </h5>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item, index) => (
              <div className="w-full flex my-4">
                <img
                  src={item?.user.avatar.url}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="font-semibold pr-2">{item.user.name}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="font-normal text-[#000000a7]">
                    {item?.comment}
                  </p>
                  <p className="text-[#000000a7] text-[14px]">{"2days ago"}</p>
                </div>
              </div>
            ))}
          {allReviews && allReviews.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Reviews yet for this shop!
            </h5>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
