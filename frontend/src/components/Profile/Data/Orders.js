import { Button } from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

// ordersData.js
export const orders = [
  {
    _id: "7463hvbfbhfbrtr28820221",
    orderItems: [
      {
        name: "Iphone 14 pro max",
      },
    ],
    totalPrice: 120,
    orderStatus: "Processing",
  },
];

export const ordersColumns = [
  { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

  {
    field: "status",
    headerName: "Status",
    minWidth: 130,
    flex: 0.7,
    cellClassName: (params) => {
      if (params && typeof params.getValue === "function") {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      }
      return "";
    },
  },

  {
    field: "itemsQty",
    headerName: "Items Qty",
    type: "number",
    minWidth: 130,
    flex: 0.7,
  },

  {
    field: "total",
    headerName: "Total",
    type: "number",
    minWidth: 130,
    flex: 0.8,
  },

  {
    field: " ",
    flex: 1,
    minWidth: 150,
    headerName: "",
    type: "number",
    sortable: false,

    renderCell: (params) => {
      return (
        <>
          <Link to={`/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        </>
      );
    },
  },
];
