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

function DiaryList({ diaryList, auth }) {
  const [order, setOrder] = useState("latest");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const checkLogin = () => {
    if (!auth.currentUser) {
      alert("로그인을 해주세요.");
      navigate("/login");
    } else {
      navigate("/new");
    }
  };

  const getSortedDiaryList = () => {
    // 필터링 함수
    const getFilteredList = (diary) => {
      // filter state가 good이면 emotion의 값이 3보다 작거나 같음
      // filter state가 good이 아니면 emotion의 값이 3보다 큼
      if (filter === "good") {
        return diary.emotion <= 3;
      } else {
        return diary.emotion > 3;
      }
    };

    // 정렬 함수
    const getOrderedList = (a, b) => {
      // [1, 11, 21].sort((a, b) => a - b);
      // order state가 latest이면 b - a
      // order state가 latest가 아니면 a - b
      if (order === "latest") {
        return b.date - a.date;
      } else {
        return a.date - b.date;
      }
    };
    const filteredList =
      filter === "all"
        ? diaryList
        : diaryList.filter((diary) => getFilteredList(diary));
    const sortedList = filteredList.sort(getOrderedList);
    return sortedList;
  };

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
          <Button text={"새 일기 쓰기"} type="positive" onClick={checkLogin} />
        </div>
        {auth.currentUser && (
          <div>
            <Button
              text={"로그아웃"}
              type="negative"
              onClick={() => auth.signOut()}
            />
          </div>
        )}
      </div>
      {getSortedDiaryList().map((diary) => {
        return <DiaryItem key={diary.id} {...diary} />;
      })}
    </div>
  );
}

export default DiaryList;
