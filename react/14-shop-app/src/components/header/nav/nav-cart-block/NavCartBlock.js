import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavCartBlock.module.scss";
import NavCartList from "./nav-cart-list/NavCartList";

function NavCartBlock() {
  return (
    <div className={styles.nav_cart_block}>
      <NavCartList />
      <div className={styles.nav_cart_price}>
        <p>합계: $ 555</p>
      </div>
      <div className={styles.nav_cart_link}>
        <Link>장바구리노 이동</Link>
      </div>
    </div>
  );
}

export default NavCartBlock;
