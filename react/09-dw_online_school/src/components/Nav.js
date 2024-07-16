import React from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import cn from "classnames";

function Nav({ className }) {
  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to="/">
          <div className={styles.logo}>
            <span>DW</span>
            OS
          </div>
        </Link>
        <ul className={styles.menu}>
          <li>
            <Link to="about">ABOUT</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
