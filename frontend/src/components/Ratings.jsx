import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Ratings = ({ rating, className }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar
          key={i}
          size={20}
          color="#f6b100"
          className={` ${
            className ? "h-5 w-5" : "h-3 w-3"
          } sm:mr-2 mr-1 cursor-pointer`}
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          key={i}
          size={17}
          color="#f6ba00"
          className={` ${
            className ? "h-5 w-5" : "h-3 w-3"
          } sm:mr-2 mr-1 cursor-pointer`}
        />
      );
    } else {
      stars.push(
        <AiOutlineStar
          key={i}
          size={20}
          color="#f6ba00"
          className={` ${
            className ? "h-5 w-5" : "h-3 w-3"
          } sm:mr-2 mr-1 cursor-pointer`}
        />
      );
    }
  }
  return <div className="flex sm:"> {stars}</div>;
};

export default Ratings;
