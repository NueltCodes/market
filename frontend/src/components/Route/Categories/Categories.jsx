import React from "react";
import styles from "../../../styles/styles";
import { brandingData, categoriesData } from "../../../static/data";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((data, index) => (
              <div className="flex item-start" key={index}>
                {data.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">
                    {data.title}
                    <p className="text-sm md:text-base">{data.Description}</p>
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        className={`${styles.section} p-2 mt-2 bg-white shadow-sm rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {categoriesData &&
            categoriesData.map((data) => {
              const handleSubmit = (data) => {
                navigate(`/products?category=${data.title}`);
              };
              return (
                <div
                  className="cursor-pointer flex flex-col items-center gap-1 shadow-md"
                  key={data.id}
                  onClick={() => handleSubmit(data)}
                >
                  <img
                    src={data.image_Url}
                    alt=""
                    className="w-full h-[50px] sm:h-[100px] object-contain"
                  />
                  <h5 className={`text-[8px] sm:text-base leading-[1.3]`}>
                    {data.title}
                  </h5>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
