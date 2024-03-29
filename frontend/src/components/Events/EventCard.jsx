import React, { useState } from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { backend_url } from "../../server";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";

const EventCard = ({ EventPage, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);

  const addToWishlistHandler = (data) => {
    setClick(!click);
    toast.success("Added to wishlist!");
    dispatch(addToWishlist(data));
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    toast.success("Removed from wishlist!");
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div
      className={` ${
        EventPage ? "w-full" : "w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5"
      } block h-full bg-white rounded-lg flex-none `}
    >
      <div className="w-full">
        <img
          src={`${data?.images && data?.images[0]?.url}`}
          alt=""
          className="800px:w-[98%] w-full h-[15vh] sm:h-[150px] object-contain"
        />
      </div>
      <div className="w-full  flex flex-col justify-center gap-2 p-2">
        <h2 className="line-clamp-1 font-[500] text-[10px] sm:text-[14px]">
          {data.name}
        </h2>
        {/* <p className="leading-8 py-4 p-2 bg-slate-50 rounded-sm whitespace-pre-line sm:block hidden h-[20vh] overflow-y-scroll">
          {data.description}
        </p> */}
        <div className="flex justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[11px] sm:text-base text-[#d55b45] pr-3 line-through">
              {data?.originalPrice}$
            </h5>
            <h5 className="font-bold text-[10px] sm:text-[14px] text-[#333] font-Roboto">
              {data?.discountPrice}$
            </h5>
          </div>
        </div>
        <div className="-mt-2">
          <CountDown data={data} />
        </div>
        <div className="flex gap-1 items-center justify-around mt-auto">
          <Link to={`/product/${data?._id}?isEvent=true`}>
            <div
              className={` rounded-lg sm:p-2 px-1.5 py-0.5 bg-[#453780] sm:text-sm text-[12px] text-[#fff]`}
            >
              {EventPage ? (
                <span>View</span>
              ) : (
                <>
                  <span className="hidden sm:block">See Details</span>
                  <span className="sm:hidden block">View</span>
                </>
              )}
            </div>
          </Link>

          <AiOutlineShoppingCart
            size={20}
            className="cursor-pointer mx-2"
            color="#444"
            title="Add to cart"
            onClick={() => addToCartHandler(data._id)}
          />

          {click ? (
            <AiFillHeart
              size={18}
              className="cursor-pointer"
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
              onClick={() => removeFromWishlistHandler(data)}
            />
          ) : (
            <AiOutlineHeart
              size={18}
              className="cursor-pointer"
              color={click ? "red" : "#333"}
              title="Add to wishlist"
              onClick={() => addToWishlistHandler(data)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
