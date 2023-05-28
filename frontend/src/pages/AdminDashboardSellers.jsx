import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AllSellers from "../components/Admin/AllSellers";

const AdminDashboardSellers = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="800px:w-[330px] w-[80]">
          <AdminSideBar active={3} />
        </div>
        <AllSellers />
      </div>
    </div>
  );
};

export default AdminDashboardSellers;
