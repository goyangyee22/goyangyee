import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardItem.module.scss";

function CardItem({ item }) {
  const { id, title, price, image } = item;
  return (
    <li key={id} className={styles.card_item}>
      <Link>
        <img src={image} />
      </Link>
      <h5>{title}</h5>
      <div>
        <button>장바구니에 담기</button>
        <p>$ {price}</p>
      </div>
    </li>
  );
}

export default CardItem;
