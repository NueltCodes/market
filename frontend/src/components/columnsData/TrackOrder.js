import { Button } from "@mui/material";
import { MdTrackChanges } from "react-icons/md";
import { Link } from "react-router-dom";

// TrackOrders
export const trackOrder = [
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

export const trackColumns = [
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
    minWidth: 130,
    headerName: "",
    type: "number",
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <Link to={`/user/track/order/${params.id}`}>
            <Button>
              <MdTrackChanges size={20} />
            </Button>
          </Link>
        </>
      );
    },
  },
];
