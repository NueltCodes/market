import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.normalFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? " 800px:text-[#fff] 800px:border-b text-black"
                  : "text-gray-500 800px:text-[#d1d1d1] 800px:hover:text-[#fff] transition"
              } pb-[30px] text-sm 800px:text-base 800px:pb-0 font-[500] mx-6 800px:mx-4 1000px:mx-6 cursor-pointer `}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
