import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllEvents from "../../components/Shop/AllEvents.jsx";

const ShopAllEvents = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="800px:w-[330px] w-[60px]">
          <DashboardSideBar active={5} />
        </div>
        <AllEvents />
      </div>
    </div>
  );
};

export default ShopAllEvents;
