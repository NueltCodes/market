import { Button } from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

export const ShopDashboardColumn = [
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

export const AdminOrderColumn = [
  { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },
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
    flex: 0.8,
  },
  {
    field: "total",
    headerName: "Total",
    type: "text",
    minWidth: 130,
    flex: 0.8,
  },
  {
    field: "createdAt",
    headerName: "Order Date",
    type: "number",
    minWidth: 130,
    flex: 0.8,
  },
];
