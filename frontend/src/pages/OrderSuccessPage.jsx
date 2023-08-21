import React, { useEffect } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import SuccessLoader from "../components/Layout/SuccessLoader";

const OrderSuccessPage = () => {
  // note this is for good ser experience, this is to scroll to top automatic when the page reload star from button
  useEffect(() => {
    window.scrollTo(0, 10);
  }, []);

  return (
    <div className="w-full h-screen  ">
      <Header />
      <div className="text-center pt-10">
        <h5 className="sm:text-5xl text-xl font-bold text-[#000000]">
          Your order is successful 😍
        </h5>
      </div>
      <SuccessLoader />
      <Footer />
    </div>
  );
};

export default OrderSuccessPage;
