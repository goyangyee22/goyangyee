import React from "react";
import { Outlet } from "react-router-dom";

function Home(props) {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Home;
