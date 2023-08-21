import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiLogInCircle, BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../cart/Cart";
import WishList from "../WishList/WishList.jsx";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const { allProducts } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px]  800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <div className="text-3xl font-bold">
                <span className="text-red-600">E•</span>Store
              </div>
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            {searchTerm.length > 0 ? (
              <RxCross1
                size={20}
                className="absolute right-2 top-1.5 cursor-pointer"
                onClick={() => setSearchTerm("")}
              />
            ) : (
              <AiOutlineSearch
                size={30}
                className="absolute right-2 top-1.5 cursor-pointer"
              />
            )}

            {searchData && searchData.length !== 0 && searchTerm ? (
              <div className="absolute w-full min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    // const d = i.name;

                    // const Product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link
                        to={`/product/${i._id}`}
                        key={index}
                        onClick={() => {
                          setSearchData(false);
                        }}
                      >
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={i.images[0]?.url}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
            <div className={`${styles.button}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Shop" : "Create Store"}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </div>
          </Link>
        </div>
      </div>

      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#453780] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative 1000px:h-[60px] h-[40px] mt-[10px] 1000px:w-[270px] w-[80px]">
              <BiMenuAltLeft
                size={30}
                className="absolute top-3 left-2 hidden 1000px:block"
              />
              <div
                className={`h-[100%] w-full 1000px:flex hidden justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                Categories
              </div>
              <div
                className={`h-[100%] 1000px:hidden w-full text-left pl-1 pt-1.5 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                Filters
              </div>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-3 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navitems */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => {
                  setOpenWishlist(true);
                }}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}{" "}
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => {
                  setOpenCart(true);
                }}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user.avatar?.url}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="hover:opacity-75 transition duration-300"
                  >
                    <BiLogInCircle
                      size={30}
                      color="red"
                      className="opacity-80"
                    />
                  </Link>
                )}
              </div>
            </div>
            {/* Cart popUp */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* WishList popUp */}
            {openWishlist ? (
              <WishList setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <div className="text-3xl font-bold mt-3 cursor-pointer">
                <span className="text-red-600">E•</span>Store
              </div>
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px] cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}{" "}
              </span>
            </div>
          </div>
          {/* Cart popUp */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* WishList popUp */}
          {openWishlist ? <WishList setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[75%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll scrollbar-hide">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px] cursor-pointer"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px] relative">
                <input
                  type="search"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                />

                {searchData && searchData.length !== 0 && searchTerm ? (
                  <>
                    {searchData && (
                      <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                        {searchData.map((i, index) => {
                          const d = i.name;

                          const Product_name = d.replace(/\s+/g, "-");
                          return (
                            <Link to={`/product/${Product_name}`} key={index}>
                              <div className="flex items-center mb-1">
                                <img
                                  src={i?.images[0].url}
                                  alt=""
                                  className="w-[40px] h-[40px] mr-[10px]"
                                />
                                <h1>{i.name}</h1>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : null}
              </div>

              <Navbar active={activeHeading} />

              {/* <div className={`${styles.button} ml-4 !rounded-[4px]`}> */}
              <Link
                to={`${isSeller ? "/dashboard" : "/shop-create"}`}
                className={`${styles.button} ml-4 !rounded-[4px]`}
              >
                <h1 className="text-[#fff] flex items-center">
                  {isSeller ? "Shop" : "Create Store"}
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
              {/* </div> */}
              <br />
              <br />
              <br />

              <div className="w-full flex justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={user?.avatar?.url}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88] mb-7"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
