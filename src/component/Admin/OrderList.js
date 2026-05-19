import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; // DataGrid for displaying orders
import "./productList.css"; // Styles for the component
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material"; // Material UI button
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import { toast } from "react-toastify";

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 110, flex: 1.2 },
    { field: "customer", headerName: "Customer", minWidth: 110, flex: 1 },
    { field: "products", headerName: "Products", minWidth: 140, flex: 1.4 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 90,
      flex: 0.6,
      cellClassName: (params) =>
        params.row.status === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Qty",
      type: "number",
      minWidth: 70,
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 90,
      flex: 0.6,
    },
    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 90,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/order/${params.row.id}`}>
            <EditIcon />
          </Link>
          <Button onClick={() => deleteOrderHandler(params.row.id)}>
            <DeleteIcon />
          </Button>
        </Fragment>
      ),
    },
  ];

  const rows = orders
    ? orders.map((item) => ({
        id: item._id,
        customer: item.user?.name || "—",
        products:
          item.orderItems?.map((oi) => oi.name).join(", ") || "—",
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      }))
    : [];

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            disableRowSelectionOnClick
            getRowHeight={() => "auto"}
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
