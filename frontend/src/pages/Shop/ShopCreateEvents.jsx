import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import CreateEvent from "../../components/Shop/CreateEvent.jsx";
const ShopCreateEvents = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="lg:w-[330px] w-[60px]">
          <DashboardSideBar active={6} />
        </div>
        <div className="mx-auto w-[90%] md:w-[70%] overflow-y-scroll scrollbar-hide mt-8 lg:w-[50%]">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEvents;
