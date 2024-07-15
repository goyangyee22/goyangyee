import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import styles from "./Home.module.css";

function Home(props) {
  return (
    <div>
      <Nav className={styles.nav} />
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
