import React from "react";
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";
import noEvents from "../../Assests/animations/noEvents2.json";
import { useLottie } from "lottie-react";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  const options = {
    animationData: noEvents,
    loop: true,
    // autoplay: true,
  };

  const { View: animationView1 } = useLottie(options);

  return (
    <div className="my-7 w-full overflow-hidden">
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading} !text-left`}>
            <h1>Flash sales</h1>
          </div>

          <div className="w-full grid">
            {allEvents.length !== 0 && (
              <EventCard data={allEvents && allEvents[0]} />
            )}

            {allEvents.length === 0 && (
              <div className="w-full flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-center">
                  <div className="w-[30%] text-center">{animationView1}</div>
                </div>
                <div className="font-bold text-center mt-4">
                  No events yet, sellers are yet to create flash sales!
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
