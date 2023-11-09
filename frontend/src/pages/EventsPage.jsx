import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/Events/EventCard";
import Loader from "../components/Layout/Loader";
import { useSelector } from "react-redux";
import noEvent2 from "../Assests/animations/noEvents2.json";
import { useLottie } from "lottie-react";
import styles from "../styles/styles";

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
          <div className={`${styles.section} `}>
            <div className="relative w-full ">
              <div className="pt-2 gap-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 my-10">
                {allEvents.map((d, index) => (
                  <EventCard EventPage data={d} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventsPage;
