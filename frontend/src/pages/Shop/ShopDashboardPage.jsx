import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import ShopDashboard from "../../components/Shop/ShopDashboard.jsx";

const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start w-full">
        <div className="lg:w-[20%] sm:w-[10%] w-[15%]">
          <DashboardSideBar active={1} />
        </div>
        <div className="lg:w-[80%] sm:w-[90%] w-[85%]">
          <ShopDashboard />
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardPage;
