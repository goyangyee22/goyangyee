import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Logout(props) {
  localStorage.removeItem("member");
  return <Navigate to="/" />;
}

export default Logout;
