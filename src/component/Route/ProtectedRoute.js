import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ isAdmin, element: Component, ...rest }) => {
  const { loading, isAuthenticated, user,error } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading) {
    return <Loader />; // Or a Loader component
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Handle specific unauthorized (401) errors
  if (error && error.response && error.response.status === 401) {
    return <Navigate to="/unauthorized" state={{ from: location }} />; // Navigate to custom 401 Unauthorized page
  }

  return Component;
};

export default ProtectedRoute;
