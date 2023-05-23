import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import Footer from "../../components/Layout/Footer";
import ShopOrderDetails from "../../components/Shop/ShopOrderDetails.jsx";

const ShopAllOrderDetails = () => {
  return (
    <div>
      <DashboardHeader />
      <ShopOrderDetails />
      <Footer />
    </div>
  );
};

export default ShopAllOrderDetails;
