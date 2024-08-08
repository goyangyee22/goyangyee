import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardItem.module.scss";

function CardItem({
  items,
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) {
  return (
    <li className={styles.card_item}>
      <Link></Link>
      <h5>{title}</h5>
      <div>
        <button>장바구니에 담기</button>
        <p>{price}</p>
      </div>
    </li>
  );
}

export default CardItem;
