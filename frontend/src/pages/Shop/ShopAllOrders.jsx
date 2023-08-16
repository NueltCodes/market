import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllOrders from "../../components/Shop/AllOrders.jsx";

const ShopAllOrders = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="800px:w-[330px] w-[60px]">
          <DashboardSideBar active={2} />
        </div>
        <AllOrders />
      </div>
    </div>
  );
};

export default ShopAllOrders;
