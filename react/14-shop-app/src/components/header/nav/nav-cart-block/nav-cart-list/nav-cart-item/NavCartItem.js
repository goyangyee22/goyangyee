import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "./NavCartItem.module.scss";
import { useSelector } from "react-redux";

function NavCartItem() {
  const { products } = useSelector((state) => state.cartSlice);
  const { category, title, price } = products;
  return (
    <div className={styles.nav_cart_item}>
      <Link>
        <img src="/gucci.jfif" />
      </Link>
      <div className={styles.nav_cart_description}>
        <h3>{category}</h3>
        <h2>{title}</h2>
        <span>{price}</span>
      </div>
      <button className={styles.nav_cart_delete}>
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default NavCartItem;
