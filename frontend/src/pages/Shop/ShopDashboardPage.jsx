import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import ShopDashboard from "../../components/Shop/ShopDashboard.jsx";

const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="800px:w-[330px] w-[80]">
          <DashboardSideBar active={1} />
        </div>
        <ShopDashboard />
      </div>
    </div>
  );
};

export default ShopDashboardPage;
