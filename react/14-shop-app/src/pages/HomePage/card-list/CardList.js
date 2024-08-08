import React, { useEffect } from "react";
import styles from "./CardList.module.scss";
import CardItem from "./card-item/CardItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/products/productsSlice";

function CardList() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsSlice);
  const category = "Electronics";

  // ※ dependency list([])를 넣어야 됨 ※
  useEffect(() => {
    const queryOptions = {
      conditions: [
        {
          field: "category",
          operator: category ? "==" : ">=",
          value: category.toLowerCase(),
        },
      ],
    };
    dispatch(fetchProducts({ collectionName: "shop", queryOptions }));
  }, [category]);

  return (
    <ul className={styles.card_list}>
      {products.map((product) => {
        return <CardItem item={product} />;
      })}
    </ul>
  );
}

export default CardList;
