import React, { useState } from "react";
import Header from "./Header";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";
import { emotionList } from "../util/emotion";
import "./DiaryEditor.css";

const INITIAL_VALUES = {
  createdAt: "",
  content: "",
  emotion: 3,
};

function DiaryEditor() {
  // 1. 날짜, 감정, 텍스트 관리할 상태를 만들어야한다.
  const [values, setValues] = useState(INITIAL_VALUES);

  // 2. 각각의 emotionItem을 클릭했을 때 console.log(emotion_id) 출력
  // 3. 1번에서 만든 state의 값이 변경되도록 만든 후 개발자 도구의 components 탭에서 확인
  const handleChange = (name, value) => {
    // name은 createdAt고 value는 날짜(ex. 2024-08-08)
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    console.log(name, value);
  };
  const handleInputChange = (e) => {
    // name은 content고 value는 input창에 입력한 값
    const { name, value } = e.target;
    handleChange(name, value);
  };

  // 4. 상태 변경 함수를 emotionItem의 onClick에 전달
  // 5. emotionItem_on_${id} 클래스가 적용될 수 있도록 함.

  const navigate = useNavigate();

  return (
    <div className="diaryEditor">
      <Header
        headText={"새 일기 작성하기"}
        leftChild={
          <Button text={"< 뒤로가기"} onClick={() => navigate("..")} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              name="createdAt"
              onChange={handleInputChange}
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
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <Button text={"취소하기"} />
            <Button text={"작성완료"} type={"positive"} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;
