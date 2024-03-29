import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8 mb-11">
      <div
        className="flex items-center hover:opacity-60 transition duration-200 cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`${
            active === 1 ? "text-[red]" : ""
          } 800px:block hidden pl-3`}
        >
          Profile
        </span>
      </div>
      <div
        className="flex items-center hover:opacity-60 transition duration-200 cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span
          className={` ${
            active === 2 ? "text-[red]" : ""
          } 800px:block hidden pl-3`}
        >
          Orders
        </span>
      </div>
      <div
        className="flex items-center hover:opacity-60 transition duration-200 cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span
          className={` ${
            active === 3 ? "text-[red]" : ""
          } 800px:block hidden pl-3`}
        >
          Refunds
        </span>
      </div>

      <div
        className="flex items-center hover:opacity-60 transition duration-200 cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span
          className={` ${
            active === 4 ? "text-[red]" : ""
          } 800px:block hidden pl-3`}
        >
          Inbox
        </span>
      </div>

      <div
        className="flex items-center hover:opacity-60 transition duration-200 cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span
          className={` ${
            active === 5 ? "text-[red]" : ""
          } 800px:block hidden pl-3`}
        >
          Track Order
        </span>
      </div>

      <div
        className="flex items-center hover:opacity-60 transition duration-200 cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
        <span
          className={` ${
            active === 6 ? "text-[red]" : ""
          } 800px:block hidden pl-3`}
        >
          Change Password
        </span>
      </div>

      <div
        className="flex items-center hover:opacity-60 transition duration-200 cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span
          className={` ${
            active === 7 ? "text-[red]" : ""
          } 800px:block hidden pl-3`}
        >
          Address
        </span>
      </div>

      {user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className="flex items-center hover:opacity-60 transition duration-200 cursor-pointer w-full mb-8"
            onClick={() => setActive(8)}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              color={active === 8 ? "red" : ""}
            />
            <span
              className={` ${
                active === 7 ? "text-[red]" : ""
              } 800px:block hidden pl-3`}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}

      <div
        className="single_item flex items-center hover:opacity-60 transition duration-200 cursor-pointer w-full mb-8"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
        <span
          className={` ${
            active === 8 ? "text-[red]" : ""
          } 800px:block hidden pl-3`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
