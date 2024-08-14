import React from "react";
import styles from "./OrdersList.module.scss";
import OrderItem from "./order-item/OrderItem";
import mockData from "../../../orderMock.json";
import { getISODate } from "../../../utils/getFormattedDate";

function OrdersList() {
  const cart = (state) => state.cartSlice;
  return (
    <div className={styles.orders}>
      {mockData.map((order, idx) => (
        <div key={idx}>
          <div className={styles.order_header}>
            <h3>주문 번호_{order.createdAt}</h3>
            <h3>
              주문 날짜_{getISODate(order.createdAt).yyyyMMdd}{" "}
              {getISODate(order.createdAt).hhmmss}
            </h3>
            <p>합계: $ {order.totalPrice.toFixed(2)}</p>
          </div>
          <ul className={styles.orders_list}>
            {order.products.map((product) => (
              <OrderItem key={product.id} {...product} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OrdersList;
