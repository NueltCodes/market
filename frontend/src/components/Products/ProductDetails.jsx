import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { server } from "../../server";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import Ratings from "../Ratings";
import axios from "axios";
import Lottie from "lottie-react";
import { useMediaQuery } from "react-responsive";
import AnimateChat from "../../Assests/animations/chat.json";

const ProductDetails = ({ data, shopImg }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
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
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex 800px:gap-2">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${data && data.images[select]?.url}`}
                  alt=""
                  className="w-[85%] h-[250px] object-contain"
                />
                <div className="w-full flex">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        className={`${
                          select === 0 ? "border" : "null"
                        } cursor-pointer mr-2 mt-4`}
                      >
                        <img
                          src={`${i?.url}`}
                          alt=""
                          className="w-[50px] h-[50px] object-cover overflow-hidden"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  ></div>
                </div>

                <div className="hidden 800px:flex  flex-col items-center mt-12">
                  <div className="font-bold flex items-center">
                    <span className="text-gray-600 underline">Store Info</span>
                  </div>
                  <div className="800px:flex items-center">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      {shopImg ? (
                        <img
                          src={shopImg?.avatar?.url}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full mr-2"
                        />
                      ) : (
                        <img
                          src={require("../../Assests/images/profile.jpg")}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full mr-2"
                        />
                      )}
                    </Link>
                    <div className="pr-3 lg:pr-8">
                      <Link to={`/shop/preview/${data?.shop._id}`}>
                        <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                          {data.shop.name}
                        </h3>
                      </Link>
                      <h5 className="pb-3 text-sm sm:text-base">
                        ({averageRating?.toFixed(1)}/5) Ratings
                      </h5>
                    </div>
                    <div
                      className={`${styles.button} !bg-[#003b95] mt-4 !rounded-2xl p-2 !h-11`}
                      onClick={handleMessageSubmit}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <span className="text-white flex items-center gap-2">
                        Chat seller
                        <Lottie
                          animationData={AnimateChat}
                          loop={isHovered}
                          autoplay
                          style={
                            isSmallScreen
                              ? { height: 30, width: 30 }
                              : { height: 40, width: 40 }
                          }
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <div className=" 800px:hidden flex my-2">
                  {data?.discountPrice ? (
                    <h4 className={`${styles.productDiscountPrice}`}>
                      ${data.discountPrice}
                    </h4>
                  ) : (
                    <h3 className="font-[500] text-[16px] mt-[-4px] ">
                      ${data.originalPrice ? data.originalPrice : null}
                    </h3>
                  )}

                  {data?.originalPrice && data?.discountPrice && (
                    <h3 className={`${styles.price}`}>
                      ${data.originalPrice ? data.originalPrice : null}
                    </h3>
                  )}
                </div>
                <h5 className="block text-[#239b79] 800px:hidden text-[15px]">
                  ({data?.ratings?.toFixed(1)}) Ratings
                </h5>
                <div className="800px:my-2 mt-0">
                  <Ratings
                    className
                    rating={data.ratings && data?.ratings?.toFixed(1)}
                  />
                </div>
                <div className="justify-end  800px:hidden flex items-center gap-1 pt-2 text-[#9147ff]">
                  stocks left
                  <span className="font-[500]">
                    {products && products.length}
                  </span>
                </div>
                <div className="my-2 font-semibold text-sm 800px:text-base 800px:hidden">
                  Product Details
                </div>
                <p className="leading-8 py-4 p-2 bg-slate-50 whitespace-pre-line h-[40vh] overflow-y-scroll">
                  {data.description}
                </p>
                <div className=" pt-3 hidden 800px:flex">
                  {data?.discountPrice ? (
                    <h4 className={`${styles.productDiscountPrice}`}>
                      ${data.discountPrice}
                    </h4>
                  ) : (
                    <h3 className="font-[500] text-[18px] mt-3">
                      ${data.originalPrice ? data.originalPrice : null}
                    </h3>
                  )}

                  {data?.originalPrice && data?.discountPrice && (
                    <h3 className={`${styles.price}`}>
                      ${data.originalPrice ? data.originalPrice : null}
                    </h3>
                  )}
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div className="flex gap-1">
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="800px:hidden flex flex-col items-start pt-8 ">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    {shopImg ? (
                      <img
                        src={shopImg?.avatar?.url}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full mr-2"
                      />
                    ) : (
                      <img
                        src={require("../../Assests/images/profile.jpg")}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full mr-2"
                      />
                    )}
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3
                        className={`${styles.shop_name} pb-1 pt-1 flex items-center gap-1 `}
                      >
                        <span className="font-semibold text-gray-800 w-[91px]">
                          Store name:
                        </span>{" "}
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-[15px] flex items-center gap-1 text-[#edbc33]">
                      <span className="font-semibold text-gray-800 w-[91px]">
                        Store ratings:
                      </span>{" "}
                      <span className="p-1">{averageRating?.toFixed(1)}/5</span>{" "}
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} !bg-[#003b95] mt-4 !rounded-2xl p-2 !h-11`}
                    onClick={handleMessageSubmit}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span className="text-white flex items-center gap-2">
                      Chat seller
                      <Lottie
                        animationData={AnimateChat}
                        loop={isHovered}
                        autoplay
                        style={
                          isSmallScreen
                            ? { height: 30, width: 30 }
                            : { height: 40, width: 40 }
                        }
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
            shopImg={shopImg}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
  shopImg,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-slate-50 px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[14px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[14px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[14px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Store Info
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 md:text-[18px] text-sm leading-8 pb-10 whitespace-pre-line h-[60vh] overflow-y-scroll">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={item?.user.avatar.url}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item?.user.name}</h1>
                    <Ratings rating={item?.rating} />
                  </div>
                  <p>{item?.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5 className="text-sm md:text-base">
                No Reviews yet for this product!
              </h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                {shopImg ? (
                  <img
                    src={shopImg?.avatar?.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                ) : (
                  <img
                    src={require("../../Assests/images/profile.jpg")}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                )}
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating?.toFixed(1)}/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data.shop.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to={`/shop/preview/${data?.shop._id}`}>
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
