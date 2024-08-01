import React, { useContext, useRef, useState } from "react";
import Header from "./Header";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";
import { emotionList } from "../util/emotion";
import "./DiaryEditor.css";
import { DiaryDispatchContext } from "../App";

const INITIAL_VALUES = {
  date: "",
  content: "",
  emotion: 3,
};

function DiaryEditor() {
  const { onCreate } = useContext(DiaryDispatchContext);
  const contentRef = useRef();
  const navigate = useNavigate();
  // 1. 날짜, 감정, 텍스트 관리할 상태를 만들어야한다.
  const [values, setValues] = useState(INITIAL_VALUES);

  // 2. 각각의 emotionItem을 클릭했을 때 console.log(emotion_id) 출력
  // 3. 1번에서 만든 state의 값이 변경되도록 만든 후 개발자 도구의 components 탭에서 확인
  const handleChange = (name, value) => {
    // name은 emotion이고 value는 1~5(id)의 값 중 하나
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    // console.log(name, value);
  };
  const handleInputChange = (e) => {
    // name은 createdAt고 value는 날짜(ex. 2024-08-08)
    // name은 content고 value는 input창에 입력한 값
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const handleSubmit = () => {
    // trim은 처음과 마지막 공백을 지우는 함수
    if (values.content.trim().length < 1) {
      handleChange("content", "");
      contentRef.current.focus();
      return;
    }
    if (window.confirm("새로운 일기를 저장하시겠습니까?")) {
      onCreate(values);
    }
    navigate("/", { replace: true });
  };

  // 4. 상태 변경 함수를 emotionItem의 onClick에 전달
  // 5. emotionItem_on_${id} 클래스가 적용될 수 있도록 함.

  return (
    <div className="diaryEditor">
      <Header
        headText={"새 일기 작성하기"}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              name="date"
              onChange={handleInputChange}
              value={values.date}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((emotion) => {
              return (
                <EmotionItem
                  key={emotion.emotion_id}
                  {...emotion}
                  name="emotion"
                  onChange={handleChange}
                  isSelected={emotion.emotion_id === values.emotion}
                />
              );
            })}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              name="content"
              onChange={handleInputChange}
              value={values.content}
              ref={contentRef}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <Button text={"취소하기"} />
            <Button
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;
