import React from "react";
import styles from "./MBTISelect.module.css";

const mbtiArr = [
  { mbti: "E", desc: "외향형", groupNum: 0 },
  { mbti: "I", desc: "내향형", groupNum: 0 },
  { mbti: "S", desc: "감각형", groupNum: 1 },
  { mbti: "N", desc: "직관형", groupNum: 1 },
  { mbti: "F", desc: "감정형", groupNum: 2 },
  { mbti: "T", desc: "사고형", groupNum: 2 },
  { mbti: "P", desc: "인식형", groupNum: 3 },
  { mbti: "J", desc: "판단형", groupNum: 3 },
];

// 각 MBTI 선택 옵션을 표시합니다.
function MBTIOption({ option, selected, changeMbti }) {
  const { mbti, desc, groupNum } = option;
  const className = `${styles.mbtiOption} ${selected ? styles.selected : ""}`;

  // MBTI를 선택하면 처리하는 함수입니다.
  const handleMbtiClick = () => {
    // 선택한 MBTI 유형(groupNum, mbti)을 변경 함수에 전달합니다.
    changeMbti(groupNum, mbti);
  };
  // debugger;
  return (
    <div className={className} onClick={handleMbtiClick}>
      <span className={styles.mbtiChar}>{mbti}</span>
      {desc}
    </div>
  );
}

// MBTI 선택 옵션들을 표시하는 부모 컴포넌트입니다.
function MBTISelect({ mbtiValue, handleChange }) {
  // MBTI 유형을 변경하는 함수입니다.
  const changeMbti = (selectedGroupNum, selectedMbti) => {
    // 현재 MBTI와 선택된 MBTI가 다른 경우에 실행됩니다.
    if (mbtiValue[selectedGroupNum] !== selectedMbti) {
      const beforeValue = mbtiValue.slice(0, selectedGroupNum);
      const afterValue = mbtiValue.slice(selectedGroupNum + 1);
      const nextValue = beforeValue + selectedMbti + afterValue;
      handleChange(nextValue);
    }
  };

  // mbtiArr 배열을 순회하며 각 MBTI 옵션을 렌더링 합니다.
  return (
    <div className={styles.mbtiOptions}>
      {mbtiArr.map((option, idx) => {
        return (
          <MBTIOption
            key={idx}
            option={option}
            selected={mbtiValue[option.groupNum] == option.mbti}
            changeMbti={changeMbti}
          />
        );
      })}
    </div>
  );
}

export default MBTISelect;
