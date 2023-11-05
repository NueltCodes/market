import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { Dialog, Transition } from "@headlessui/react";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";

const DropDown = ({ categoriesData, dropDown, setDropDown }) => {
  const navigate = useNavigate();

  const submitHandler = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <Transition.Root show={dropDown} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          setDropDown(false);
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

        <div className="fixed inset-0 flex w-[100%] sm:w-[55%]">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-y-full"
            enterTo="translate-y-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-full"
          >
            <Dialog.Panel className="relative flex flex-col w-full max-w-[80%] bg-white">
              <div className="m-4 800px:text-3xl text-2xl font-bold">
                <Link to="/">
                  <span className="text-red-600">M•</span>arket
                </Link>
              </div>{" "}
              <div
                className="absolute right-2 top-2 z-50 bg-white rounded-full shadow-md hover:shadow-sm transition cursor-pointer"
                onClick={() => {
                  setDropDown(false);
                }}
              >
                <AiOutlineCloseCircle
                  size={20}
                  className="m-1 mt-2 rounded-full shadow-md"
                />
              </div>
              <div className="overflow-y-scroll scrollbar-hide mt-5 sm:mt-3 px-2 sm:px-4">
                {categoriesData &&
                  categoriesData.map((i, index) => (
                    <div
                      key={index}
                      className={`${styles.normalFlex}`}
                      onClick={() => submitHandler(i)}
                    >
                      <div className="w-full flex items-start my-3 text-gray-800 hover:bg-[#453780] hover:text-white p-1">
                        <img
                          src={i.image_Url}
                          alt=""
                          className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] 800px:w-[40px] 800px:h-[40px] mr-[10px]"
                        />
                        <h1 className="sm:text-sm font-normal text-base 800px:text-base">
                          {i.title}
                        </h1>
                      </div>
                    </div>
                  ))}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DropDown;
