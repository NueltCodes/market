import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllCoupons from "../../components/Shop/AllCoupons.jsx";

const ShopAllCoupons = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="800px:w-[330px] w-[60px]">
          <DashboardSideBar active={9} />
        </div>
        <AllCoupons />
      </div>
    </div>
  );
};

export default ShopAllCoupons;
