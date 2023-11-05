import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import {
  BiArrowBack,
  BiLogInCircle,
  BiMenuAltLeft,
  BiSearch,
} from "react-icons/bi";
import { Dialog, Transition } from "@headlessui/react";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import WishList from "../WishList/WishList.jsx";
import { RxAvatar, RxCross1, RxHamburgerMenu } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const { allProducts } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [searchOpen]);

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
                <span className="text-red-600">M•</span>arket
              </div>
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <div className="z-50" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                placeholder="Search Product..."
                value={searchTerm}
                onChange={handleSearchChange}
                onClick={() => setMobileSearch(true)}
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
            </div>

            <Transition.Root show={mobileSearch} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-50"
                onClose={() => {
                  setMobileSearch(false);
                  setSearchTerm("");
                }}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-900/80" />
                </Transition.Child>

                <div className="fixed inset-0 flex w-[80%] sm:w-[75%]">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-y-0"
                    leaveTo="-translate-y-full"
                  >
                    <Dialog.Panel className="relative mr-16 flex flex-col w-full max-w-[80%] bg-white">
                      <div className="p-2 flex items-center gap-3 shadow-md">
                        <div>
                          <BiArrowBack
                            size={20}
                            className="cursor-pointer text-gray-700"
                            onClick={() => {
                              setMobileSearch(false);
                              setSearchTerm("");
                            }}
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Search Product..."
                          value={searchTerm}
                          onChange={handleSearchChange}
                          className="h-[30px] w-full px-2 border-slate-200 border-[1px] rounded-md"
                        />
                      </div>

                      <div className="overflow-y-scroll scrollbar-hide mt-3 px-4">
                        {searchData &&
                          searchData.map((i, index) => {
                            return (
                              <Link
                                to={`/product/${i._id}`}
                                key={index}
                                onClick={() => {
                                  setSearchData(false);
                                }}
                              >
                                <div className="w-full flex items-start my-3 text-gray-800 hover:bg-[#453780] hover:text-white p-1">
                                  <img
                                    src={i.images[0]?.url}
                                    alt=""
                                    className="w-[30px] h-[30px] 800px:w-[40px] 800px:h-[40px] mr-[10px]"
                                  />
                                  <h1 className="sm:text-sm 800px:text-base">
                                    {i.name}
                                  </h1>
                                </div>
                              </Link>
                            );
                          })}
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>
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
          <div
            onClick={() => setDropDown(!dropDown)}
            className="relative w-[130px] "
          >
            <div>
              <div className="flex items-center gap-4 bg-white py-2 px-2 rounded-lg">
                Categories
                <IoIosArrowDown
                  size={20}
                  className="absolute right-2 top-3 cursor-pointer"
                  onClick={() => setDropDown(!dropDown)}
                />
              </div>

              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                  dropDown={dropDown}
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
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden flex items-center `}
      >
        <div className="w-full flex items-center justify-between gap-3 relative">
          <RxHamburgerMenu
            size={30}
            className="ml-4 cursor-pointer"
            onClick={() => setOpen(true)}
          />
          <div>
            <Link to="/">
              <div className="sm:text-3xl text-base font-bold cursor-pointer">
                <span className="text-red-600">M•</span>arket
              </div>
            </Link>
          </div>

          <div>
            <BiSearch size={25} onClick={() => setSearchOpen(true)} />
          </div>

          {isAuthenticated ? (
            <div>
              <Link to="/profile">
                <img
                  src={user?.avatar?.url}
                  alt=""
                  className="w-[25px] h-[25px] rounded-full border-[1.5px] border-[#0eae88]"
                />
              </Link>
            </div>
          ) : (
            <Link to="/profile" className="text-sm flex items-center gap-1">
              <RxAvatar size={25} />
            </Link>
          )}
          <div className="">
            <IoIosArrowDown
              size={25}
              className=""
              onClick={() => setDropDown(!dropDown)}
            />
          </div>
          <div>
            <div
              className="relative mr-[20px] cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={25} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-3 h-3 top right p-0 m-0 text-white font-mono text-[10px]  leading-tight text-center">
                {cart && cart.length}{" "}
              </span>
            </div>
          </div>
          {/* Cart popUp */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* WishList popUp */}
          {openWishlist ? <WishList setOpenWishlist={setOpenWishlist} /> : null}

          {/* searchDisplay */}
          {searchOpen && (
            <div className="absolute w-full h-screen inset-0 bg-gray-50 z-50">
              <div className="p-2 flex items-center gap-3 shadow-md">
                <div>
                  <BiArrowBack
                    size={20}
                    className="cursor-pointer text-gray-700"
                    onClick={() => setSearchOpen(false)}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[30px] w-full px-2 border-slate-200 border-[1px] rounded-md"
                />
              </div>
              <div className="mt-3 w-full h-full overflow-y-auto px-4">
                {searchData &&
                  searchData?.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`} key={index}>
                        <div className="flex items-center gap-1 my-3 hover:bg-[#453780] p-1 group text-gray-800 hover:text-white">
                          <img
                            src={i?.images[0].url}
                            alt=""
                            className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px]"
                          />
                          <h1 className="text-[10px] sm:text-base">{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        {/* header sidebar */}
        {open && (
          <>
            <div
              className={`fixed w-full bg-[#0000005f] z-10 h-full top-0 left-0`}
              onClick={() => setOpen(false)}
            ></div>
            <div className="fixed w-[75%] bg-[#fff] h-screen top-0 left-0 z-20 overflow-y-scroll scrollbar-hide">
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

              <div className="mt-9">
                <Navbar active={activeHeading} />
              </div>
              {/* <div className={`${styles.button} ml-4 !rounded-[4px]`}> */}
              <Link
                to={`${isSeller ? "/dashboard" : "/shop-create"}`}
                className={`${styles.button} !bg-[#453780] ml-4 !rounded-[4px]`}
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
          </>
        )}
      </div>
    </>
  );
};

export default Header;
