import React from "react";
import CheckoutSteps from "../components/Checkout/CheckoutSteps.jsx";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Payment from "../components/Payment/Payment";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Header />
      <div className="relative">
        <br />
        <br />
        <Link to="/checkout">
          <div className="absolute left-5 top-1 sm:left-10 sm:top-50 z-10 bg-white rounded-full shadow-md hover:shadow-sm transition cursor-pointer">
            <IoIosArrowBack
              size={20}
              className="m-1 text-gray-600 rounded-full"
            />
          </div>
        </Link>
      </div>
      <CheckoutSteps active={2} />
      <Payment />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default PaymentPage;
