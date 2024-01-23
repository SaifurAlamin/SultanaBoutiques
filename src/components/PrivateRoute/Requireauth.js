import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Requireauth = ({ children }) => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const googleUser = JSON.parse(localStorage.getItem("access_token"));

  const token = user?.token;

  //   if (isLoading) {
  //     return (
  //       <p className="text-center text-danger fs-1 fw-bold loading-issue">
  //         Loading...
  //       </p>
  //     );
  //   }
  if (!token && !googleUser) {
    return (
      <Navigate to="/login" state={{ path: location?.pathname }} replace />
    );
  } else {
    return children;
  }
};

export default Requireauth;
