import React from "react";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineGift } from "react-icons/ai";
import { useSelector } from "react-redux";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="w-full h-[10vh] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <div className="text-3xl font-bold">
            <span className="text-red-600">E•</span>Store
          </div>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/cupouns" className="800px:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard-messages" className="800px:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <img
            src={`${user.avatar.url}`}
            alt=""
            className="w-[40px] h-[40px]  rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
