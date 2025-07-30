import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "../../../images/Profile.png";
import HomeIcon from "@mui/icons-material/Home";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const guestOptions = [
    { icon: <HomeIcon />, name: "Home", func: () => navigate("/") },
    {
      icon: <LocalMallIcon />,
      name: "Products",
      func: () => navigate("/products"),
    },
    {
      icon: <ContactMailIcon />,
      name: "Contact",
      func: () => navigate("/contact"),
    },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      func: () => navigate("/cart"),
    },
    {
      icon: <LoginIcon />,
      name: "Login",
      func: () => navigate("/login"),
    },
  ];

  const userOptions = [
    { icon: <HomeIcon />, name: "Home", func: () => navigate("/") },
    {
      icon: <LocalMallIcon />,
      name: "Products",
      func: () => navigate("/products"),
    },
    {
      icon: <ContactMailIcon />,
      name: "Contact",
      func: () => navigate("/contact"),
    },
    {
      icon: <ListAltIcon />,
      name: "Orders",
      func: () => navigate("/orders"),
    },

    {
      icon: <PersonIcon />,
      name: "Profile",
      func: () => navigate("/account"),
    },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      func: () => navigate("/cart"),
    },
    {
      icon: <ExitToAppIcon />,
      name: "Logout",
      func: () => {
        dispatch(logout());
        navigate("/");
      },
    },
  ];

  if (user && user.role === "admin") {
    userOptions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: () => navigate("/admin/dashboard"),
    });
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: 10 }} />
      <SpeedDial
        ariaLabel="SpeedDial User Options"
        className="speedDial"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        style={{ zIndex: 11 }}
        icon={
          <img
            src={user?.avatar?.url || profileImg}
            alt="Profile"
            className="speedDialIcon"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = profileImg;
            }}
          />
        }>
        {(user ? userOptions : guestOptions).map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
            tooltipOpen={window.innerWidth <= 600}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
