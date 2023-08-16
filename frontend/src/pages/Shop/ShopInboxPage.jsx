import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardMessages from "../../components/Shop/DashboardMessages.jsx";

const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="lg:w-[330px] w-[60px]">
          <DashboardSideBar active={8} />
        </div>
        <DashboardMessages />
      </div>
    </div>
  );
};

export default ShopInboxPage;
