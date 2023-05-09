import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllProducts from "../../components/Shop/AllProducts.jsx";

const ShopAllProducts = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[330px] w-[80]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full flex justify-center">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;
