import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { DataGrid } from "@mui/x-data-grid";
import { ShopOrdersColumn } from "../columnsData/ShopOrderColumn";

const AllRefundOrders = () => {
  const { shopOrders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const refundOrders =
    shopOrders &&
    shopOrders.filter(
      (item) =>
        item.status === "Processing refund" || item.status === "Refund Success"
    );

  const row = [];

  refundOrders &&
    refundOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] lg:w-[80%] p-4 mt-3 bg-white">
          <DataGrid
            rows={row}
            columns={ShopOrdersColumn}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllRefundOrders;
