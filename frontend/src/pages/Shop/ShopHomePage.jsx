import React from "react";
import styles from "../../styles/styles";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData.jsx";

const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full 800px:flex py-10 justify-between">
        <div className="800px:w-[25%] w-full bg-[#fff] rounded-[4px] shadow-sm 800px:overflow-y-scroll scrollbar-hide 800px:h-[90vh] 800px:sticky top-10 left-0 z-10">
          <ShopInfo isOwner={true} />
        </div>
        <div className="800px:w-[72%] mt-10 800px:mt-['unset'] rounded-[4px] shadow-md p-2">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
