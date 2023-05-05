import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShopHomePage = () => {
  const navigate = useNavigate();
  const { isSeller } = useSelector((state) => state.seller);
  useEffect(() => {
    if (isSeller === true) {
      navigate("/");
    }
  }, [isSeller, navigate]);

  return <div>ShopHomePage</div>;
};

export default ShopHomePage;
