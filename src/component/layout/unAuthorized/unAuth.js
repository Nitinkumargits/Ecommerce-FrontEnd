import React from "react";
import "./NotFound.css";
import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon />

      <Typography>Sorry, you are not authorized to access this page. </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
