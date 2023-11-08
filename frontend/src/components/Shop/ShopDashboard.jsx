import React, { useEffect, useState } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { ShopDashboardColumn } from "../columnsData/ShopDashboardColumn";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { MdBorderClear } from "react-icons/md";
import styles from "../../styles/styles";
import Lottie from "lottie-react";
import AnimateAccount from "../../Assests/animations/account.json";
import AnimateAnalytics from "../../Assests/animations/analytics.json";
import AnimateVideo from "../../Assests/animations/videocam.json";

const ShopDashboard = () => {
  const dispatch = useDispatch();
  const { shopOrders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const [balance, setBalance] = useState(false);
  const [order, setOrder] = useState(false);
  const [product, setProduct] = useState(false);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const availableBalance = seller?.availableBalance.toFixed(2);

  const row = [];

  shopOrders &&
    shopOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="w-[100%] md:p-8 p-4">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="text-[14px] font-semibold mb-2">
        <span className="text-red-600 font-normal text-[18px]">Note:</span> 10%
        service charge included in all sales
      </div>
      <div className="w-full block 800px:flex items-center justify-between gap-5">
        <div
          className="w-full mb-4 bg-white shadow rounded px-2 py-5"
          onMouseEnter={() => setBalance(true)}
          onMouseLeave={() => setBalance(false)}
        >
          <div className="flex items-start gap-1">
            <Lottie
              animationData={AnimateAccount}
              loop={balance}
              autoplay
              style={{ height: 40, width: 40 }}
            />
            <h3
              className={`${styles.productTitle} !text-[18px] !font-normal text-[#00000085]`}
            >
              Account Balance{" "}
            </h3>
          </div>

          <h5 className="pt-2 pl-[36px] text-[22px] font-medium">
            ${availableBalance}
          </h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>

        <div
          className="w-full mb-4 bg-white shadow rounded px-2 py-5"
          onMouseEnter={() => setOrder(true)}
          onMouseLeave={() => setOrder(false)}
        >
          <div className="flex items-center gap-1">
            <Lottie
              animationData={AnimateAnalytics}
              loop={order}
              autoplay
              style={{ height: 40, width: 40 }}
            />{" "}
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-normal text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-medium">
            {shopOrders && shopOrders.length}
          </h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>

        <div
          className="w-full mb-4 bg-white shadow rounded px-2 py-5"
          onMouseEnter={() => setProduct(true)}
          onMouseLeave={() => setProduct(false)}
        >
          <div className="flex items-center gap-1">
            <Lottie
              animationData={AnimateVideo}
              loop={product}
              autoplay
              style={{ height: 40, width: 40 }}
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-normal text-[#00000085]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-medium">
            {products && products.length}
          </h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <DataGrid
          rows={row}
          columns={ShopDashboardColumn}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default ShopDashboard;
