import React from "react";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AllOrders from "../components/Admin/AdminAllOrders";

const AdminDashboardOrders = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="800px:w-[330px] w-[80]">
          <AdminSideBar active={3} />
        </div>
        <AllOrders />
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
