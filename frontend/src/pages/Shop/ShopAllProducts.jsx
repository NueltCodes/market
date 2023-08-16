import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllProducts from "../../components/Shop/AllProducts.jsx";

const ShopAllProducts = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="lg:w-[330px] w-[60px]">
          <DashboardSideBar active={3} />
        </div>
        <AllProducts />
      </div>
    </div>
  );
};

export default ShopAllProducts;
