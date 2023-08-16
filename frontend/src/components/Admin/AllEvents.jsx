import React, { useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminAllEvents } from "../../redux/actions/event";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Loader from "../Layout/Loader";

const AllEvents = () => {
  const { adminAllEvents, isLoading } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminAllEvents());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}?isEvent=true`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  adminAllEvents &&
    adminAllEvents.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "$ " + item.discountPrice,
        Stock: item.stock,
        sold: item.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] p-4 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllEvents;
