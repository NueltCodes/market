import { Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const handleDelete = (id) => {};
export const UsersColumnData = [
  { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

  {
    field: "name",
    headerName: "Name",
    minWidth: 130,
    flex: 0.7,
  },
  {
    field: "email",
    headerName: "Email",
    type: "text",
    minWidth: 150,
    flex: 0.7,
  },
  {
    field: "role",
    headerName: "User Role",
    type: "text",
    minWidth: 130,
    flex: 0.7,
  },

  {
    field: "joinedAt",
    headerName: "Joined-in-date",
    type: "number",
    minWidth: 130,
    flex: 0.8,
  },

  {
    field: " ",
    flex: 1,
    minWidth: 130,
    headerName: "Delete User",
    type: "number",
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <Link to={`/order/${params.id}`}>
            <Button onClick={() => handleDelete(params._id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </Link>
        </>
      );
    },
  },
];
