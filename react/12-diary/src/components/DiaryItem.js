import React from "react";
import Button from "./Button";
import "../components/DiaryItem.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
}

function DiaryItem({ item }) {
  const { createdAt, content } = item;
  return (
    <div className="diaryItem">
      <div className="emotion_img_wrapper emotion_img_wrapper_1">
        <img src="assets/emotion1.png" />
      </div>
      <div className="info_wrapper">
        <div className="diary_date">{formatDate(createdAt)}</div>
        <div className="diary_content_preview">{content}</div>
      </div>
      <div className="btn_wrapper">
        <Button text={"수정하기"} />
      </div>
    </div>
  );
}

export default DiaryItem;
