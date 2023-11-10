import React, { useState } from "react";
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);

  const scrollEvents = (event) => {
    const container = event.currentTarget;
    const buffer = 10; // Adjust this value as needed
    const isAtEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - buffer;

    setShowRight(!isAtEnd);

    const isAtStart = container.scrollLeft === 0;
    setShowLeft(!isAtStart);
  };

  const scrollEvent = (direction) => {
    const container = document.querySelector(".scroll-container8");
    if (container) {
      const newScrollLeft = container.scrollLeft + direction;

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      const isAtEnd =
        newScrollLeft + container.clientWidth >= container.scrollWidth;
      setShowRight(!isAtEnd);
    }
  };
  return (
    <>
      {isLoading || (
        <div className="mt-5 bg-[#031e58] w-full items-center justify-center py-5">
          <h1
            className={` ${styles.section} font-bold text-base sm:text-lg md:text-2xl p-2 text-white`}
          >
            Flash sales{" "}
          </h1>
          <div className={`${styles.section} bg-black py-2  overflow-hidden`}>
            <div className="mx-2">
              <div className="relative group">
                <div
                  className="pt-2 scroll-container8 overflow-x-auto scrollbar-hide"
                  onScroll={scrollEvents}
                >
                  <div className="flex flex-nowrap space-x-1 sm:space-x-3">
                    {allEvents.map((d, index) => (
                      <EventCard data={d} key={index} className />
                    ))}
                  </div>
                </div>
                {allEvents && allEvents.length > 3 && showLeft && (
                  <button
                    className="absolute group-hover:sm:block hidden z-50 -left-4 top-1/2 hover:opacity-80 transition bg-white/95 border border-[#003b95] rounded-full p-2"
                    onClick={() => scrollEvent(-350)}
                  >
                    <BsChevronLeft size={25} className="text-blue-400" />
                  </button>
                )}
                {allEvents && allEvents.length > 3 && showRight && (
                  <button
                    className="absolute group-hover:sm:block hidden z-50 -right-4 top-1/2 hover:opacity-80 transition bg-white/95 border border-[#003b95] rounded-full p-2"
                    onClick={() => scrollEvent(350)}
                  >
                    <BsChevronRight size={25} className="text-blue-400" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
