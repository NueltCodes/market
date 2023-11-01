import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import Ratings from "../../Ratings";

const ProductCard = ({ data, key, isEvent, className }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    toast.success("Removed from wishlist!");
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    toast.success("Added to wishlist!");
    dispatch(addToWishlist(data));
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

  // function below is used the replace spaces with dash when passed to the params as links
  // const d = data.name;
  // const product_name = d.replace(/\s+/g, "-");

  return (
    <>
      <div
        className={` ${
          className
            ? " flex-none w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5 cursor-pointer"
            : ""
        } m-1 bg-white rounded-lg shadow-md hover:shadow-sm transition duration-300 ease-in-out p-2 relative cursor-pointer group`}
        key={key}
      >
        <div className="flex justify-end"></div>
        <Link
          className="aspect-square overflow-hidden"
          to={`${
            isEvent === true
              ? ` /product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt=""
            className="800px:w-[98%] w-full h-[15vh] sm:h-[150px] object-contain 800px:pr-2 group-hover:scale-105 transition overflow-hidden"
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link
          to={`${
            isEvent === true
              ? ` /product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          {" "}
          <h4 className="pb-3 font-[500] truncate text-sm sm:text-base">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <div className="flex">
            <Ratings rating={data?.ratings} />
          </div>
          <div className="py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex">
              <h5
                className={`${styles.productDiscountPrice} text-sm sm:text-base`}
              >
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                $
              </h5>
              <h4 className={`${styles.price} !text-[12px] !sm:text-[14px]`}>
                {data.originalPrice ? data.originalPrice + " $" : null}
              </h4>
            </div>
            <span className="hidden sm:block font-[400] text-[17px] text-[#68d284]">
              stock: {data?.stock}
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={18}
              className="cursor-pointer absolute right-0.5 top-5"
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
              onClick={() => removeFromWishlistHandler(data)}
            />
          ) : (
            <AiOutlineHeart
              size={18}
              className="cursor-pointer absolute right-0.5 top-5"
              color={click ? "red" : "#333"}
              title="Add to wishlist"
              onClick={() => addToWishlistHandler(data)}
            />
          )}
          <AiOutlineEye
            size={18}
            className="cursor-pointer absolute right-0.5 top-14"
            color="#333"
            title="Quick view"
            onClick={() => setOpen(!open)}
          />
          <AiOutlineShoppingCart
            size={20}
            className="cursor-pointer absolute right-0.5 top-24"
            color="#444"
            title="Add to cart"
            onClick={() => addToCartHandler(data._id)}
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
