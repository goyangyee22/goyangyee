import React from "react";
import styles from "./OrdersList.module.scss";
import OrderItem from "./order-item/OrderItem";

function OrdersList({ order }) {
  const { updatedAt, totalPrice, products } = order;
  const orderDate = new Date(updatedAt);
  return (
    <div className={styles.orders}>
      <div>
        <div className={styles.order_header}>
          <h3>주문 번호_{updatedAt}</h3>
          <h3>주문 날짜_{orderDate.toLocaleDateString()}</h3>
          <p>합계: $ {totalPrice.toFixed(2)}</p>;
        </div>
        <ul>
          {products.map((product) => (
            <OrderItem key={product.id} item={product} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OrdersList;
