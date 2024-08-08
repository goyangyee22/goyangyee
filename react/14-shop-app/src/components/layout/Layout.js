import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";

function Layout() {
  return (
    <div>
      HEADER <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
