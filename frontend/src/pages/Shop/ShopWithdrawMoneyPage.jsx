import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import WithdrawMoney from "../../components/Shop/WithdrawMoney.jsx";

const ShopWithdrawMoneyPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="800px:w-[330px] w-[60px]">
          <DashboardSideBar active={7} />
        </div>
        <WithdrawMoney />
      </div>
    </div>
  );
};

export default ShopWithdrawMoneyPage;
