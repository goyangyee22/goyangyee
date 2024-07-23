import React, { useState } from "react";
import FoodDog from "../assets/IMG_1685.jpeg";
import "./FoodList.css";
import useTranslate from "./../hooks/useTranslate";

function FoodList({ item, handleDelete, handleEdit }) {
  //   const t = useTranslate();
  const handleDeleteClick = () => {
    handleDelete(item.docId, item.imgUrl);
  };
  const handleEditClick = () => {
    handleEdit(item.id);
  };
  return (
    <div>
      <div className="FoodListItem">
        <img className="FoodListItem-img" src={FoodDog} />
        <div className="FoodListItem-rows">
          <div className="FoodListItem-intro">
            <h1 className="FoodListItem-title">똥개</h1>
            <p className="FoodListItem-calorie">220kcal</p>
          </div>
          <p className="FoodListItem-content">보신탕용 개입니다.</p>
          <p className="FoodListItem-date">2017. 12. 12.</p>
        </div>
        <div className="FoodListItem-buttons">
          <button
            className="FoodListItem-edit-button"
            onClick={handleEditClick}
          >
            수정
          </button>
          <button
            className="FoodListItem-delete-button"
            onClick={handleDeleteClick}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodList;
