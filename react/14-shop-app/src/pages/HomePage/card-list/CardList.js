import React from "react";
import styles from "./CardList.module.scss";
import CardItem from "./card-item/CardItem";

const products = [
  {
    id: 1,
    title: "가방",
    price: 109.95,
    description:
      "숲에서 하루종일 걷고 난리쳐도 좋은 가방. 15인치가 넘는 노트북도 들어감",
    category: "Men's clothing",
    image: "/gucci.jfif",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
];

function CardList() {
  return (
    <ul className={styles.card_list}>
      {products.map((product) => {
        return <CardItem item={product} />;
      })}
    </ul>
  );
}

export default CardList;
