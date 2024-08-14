import React from "react";
import OrdersList from "./orders-list/OrdersList";
import OrderMock from "../../../orderMock.json";

function OrderPage() {
  return (
    <div className="page">
      <div className="container">
        <h1>주문 히스토리</h1>
        {OrderMock.map((order) => {
          <OrdersList key={order.updatedAt} order={order} />;
        })}
      </div>
    </div>
  );
}

export default OrderPage;
