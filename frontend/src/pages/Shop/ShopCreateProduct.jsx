import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import CreateProduct from "../../components/Shop/CreateProduct.jsx";

const ShopCreateProduct = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="lg:w-[330px] w-[60px]">
          <DashboardSideBar active={4} />
        </div>
        <div className="mx-auto w-[90%] md:w-[70%] overflow-y-scroll scrollbar-hide mt-8 lg:w-[50%]">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProduct;
