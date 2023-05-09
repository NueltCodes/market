import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllEvents from "../../components/Shop/AllEvents.jsx";

const ShopAllEvents = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[330px] w-[80]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full flex justify-center">
          <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default ShopAllEvents;
