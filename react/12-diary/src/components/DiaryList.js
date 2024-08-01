import React, { useState } from "react";
import Button from "./Button";
import "./DiaryList.css";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";

const sortOptionList = [
  { name: "최신순", value: "latest" },
  { name: "오래된순", value: "oldest" },
];

const filterOptionList = [
  { name: "전부다", value: "all" },
  { name: "좋은 감정만", value: "good" },
  { name: "안 좋은 감정만", value: "bad" },
];

function ControlMenu({ optionList, value, onChange }) {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((option, idx) => {
        return (
          <option key={idx} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}

function DiaryList({ diaryList }) {
  const [order, setOrder] = useState("latest");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const getSortedDiaryList = () => {
    // 필터링 함수
    const getFilteredList = () => {
      // filter state가 good이면 emotion의 값이 3보다 작거나 같음
      // filter state가 good이 아니면 emotion의 값이 3보다 큼
      if(filter === "good"){
        return diaryList.filter((diary) => diary.emotion <= 3);
      } else if (filter === "bad"){
        return diaryList.filter((diary) => diary.emotion > 3);
      } else{
        return diaryList;
      }
    };

    // 정렬 함수
    const getOrderedList = (list) => {
      // [1, 11, 21].sort((a, b) => a - b);
      // order state가 latest이면 b - a
      // order state가 latest가 아니면 a - b
      if (order === "latest") {
        return list.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else {
        return list.sort((a, b) => new Date(a.date) - new Date(b.date));
      }
    };
    const filteredList = getFilteredList();
    const sortedList = getOrderedList(filteredList);
    return sortedList;
  };

  const sortedDiaryList = getSortedDiaryList();

  return (
    <div className="diaryList">
      <div className="menu_wrapper">
        <div className="control_menus">
          <ControlMenu
            optionList={sortOptionList}
            value={order}
            onChange={setOrder}
          />
          <ControlMenu
            optionList={filterOptionList}
            value={filter}
            onChange={setFilter}
          />
        </div>
        <div className="new_btn">
          <Button
            text={"새 일기 쓰기"}
            type="positive"
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {sortedDiaryList.map((diary) => {
        return <DiaryItem key={diary.id} {...diary} />;
      })}
    </div>
  );
}

export default DiaryList;
