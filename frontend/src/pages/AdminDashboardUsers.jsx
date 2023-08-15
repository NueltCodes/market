import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AllUsers from "../components/Admin/AllUsers.jsx";

const AdminDashboardUsers = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="800px:w-[330px] w-[60px]">
          <AdminSideBar active={4} />
        </div>
        <AllUsers />
      </div>
    </div>
  );
};

export default AdminDashboardUsers;
