import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";

function DiaryPage(props) {
  const navigate = useNavigate();
  const param = useParams();
  console.log(param);
  return (
    <div className="diaryPage">
      <Header
        headText={"2024-08-01"}
        leftChild={<Button text={"<뒤로가기"} onClick={() => navigate(-1)} />}
        rightChild={<Button text={"수정하기"} />}
      />
      <article>
        <section></section>
        <section></section>
      </article>
    </div>
  );
}

export default DiaryPage;
