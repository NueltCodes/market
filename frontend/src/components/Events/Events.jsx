import React from "react";
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";
import noEvents from "../../Assests/animations/noEvents2.json";
import noEvent2 from "../../Assests/animations/noEvents.json";
import { useLottie } from "lottie-react";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  const options = {
    animationData: noEvents,
    loop: true,
    // autoplay: true,
  };
  const option2 = {
    animationData: noEvent2,
    loop: true,
    // autoplay: true,
  };
  const { View: animationView1 } = useLottie(options);
  const { View: animationView2 } = useLottie(option2);
  // const { View } = useLottie(options);

  return (
    <div className="mb-7 md:mb-20">
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Flash sales</h1>
          </div>

          <div className="w-full grid">
            {allEvents.length !== 0 && (
              <EventCard data={allEvents && allEvents[0]} />
            )}

            {allEvents.length === 0 && (
              <>
                <div className="w-full sm:h-[60vh] h-[30vh] sm:mt-6 flex items-center justify-center">
                  <div
                    style={{
                      display: "flex",
                      gap: 200,
                      width: "100%", // Set the width to 100% to occupy the available space
                      justifyContent: "center", // Center the animations horizontally
                    }}
                  >
                    <div
                      style={{
                        width: "50%",
                        textAlign: "center",
                      }}
                    >
                      {animationView1}
                    </div>
                    {/* <div style={{ width: "100%", textAlign: "center" }}>
                      {animationView2}
                    </div> */}
                  </div>
                </div>
                <div className="font-bold text-center ">
                  No events yet, sellers are yet to create flash sales!
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
