import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { backend_url } from "../../../server";

const ProductCard = ({ data, key }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  // function below is used the replace spaces with dash when passed to the params as links
  // const d = data.name;
  // const product_name = d.replace(/\s+/g, "-");

  return (
    <>
      <div
        className="w-full h-[350px] bg-white rounded-lg shadow-md hover:shadow-sm transition duration-300 ease-in-out p-2 relative cursor-pointer"
        key={key}
      >
        <div className="flex justify-end"></div>
        <Link to={`/product/${data._id}`}>
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt=""
            className="800px:w-[98%] w-full h-[170px] object-contain 800px:pr-2 bg-gray-50"
          />
        </Link>
        <Link to="/">
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${data._id}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#F6BA00"
              size={20}
            />
            <AiOutlineStar
              size={20}
              className="mr-2 cursor-pointer"
              color="#F6BA00"
            />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                $
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              50 sold
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={18}
              className="cursor-pointer absolute right-0.5 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={18}
              className="cursor-pointer absolute right-0.5 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={18}
            className="cursor-pointer absolute right-0.5 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={20}
            className="cursor-pointer absolute right-0.5 top-24"
            onClick={() => setOpen(!open)}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
