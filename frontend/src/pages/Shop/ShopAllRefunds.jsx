import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllRefundOrders from "../../components/Shop/AllRefundOrders.jsx";

const ShopAllRefunds = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="800px:w-[330px] w-[60px]">
          <DashboardSideBar active={10} />
        </div>
        <AllRefundOrders />
      </div>
    </div>
  );
};

export default ShopAllRefunds;
