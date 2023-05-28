import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AllEvents from "../components/Admin/AllEvents.jsx";

const AdminDashboardEvents = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="800px:w-[330px] w-[80]">
          <AdminSideBar active={6} />
        </div>
        <AllEvents />
      </div>
    </div>
  );
};

export default AdminDashboardEvents;
