import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/Events/EventCard";
import Loader from "../components/Layout/Loader";
import { useSelector } from "react-redux";
import noEvent2 from "../Assests/animations/noEvents2.json";
import { useLottie } from "lottie-react";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  const options = {
    animationData: noEvent2,
    loop: true,
    // autoplay: true,
  };
  const { View } = useLottie(options);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allEvents && allEvents.length === 0 && (
            <>
              <div className="font-bold text-center mt-20 ">
                No events yet, sellers are yet to create flash sales!
              </div>{" "}
              <div className="w-full mt-12 sm:h-[30%] h-[30vh] sm:mt-6 flex items-center justify-center">
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
                    {View}
                  </div>
                  {/* <div style={{ width: "100%", textAlign: "center" }}>
                      {animationView2}
                    </div> */}
                </div>
              </div>
            </>
          )}
          {allEvents && allEvents.length > 0 && (
            <div className="mb-16">
              <EventCard active={true} data={allEvents && allEvents[0]} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EventsPage;
