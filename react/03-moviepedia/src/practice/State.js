import React, { useState } from "react";

let value;
function useState(initialValue) {
  if (value === undefined) {
    value = initialValue;
  }
  const setState = (newValue) => {
    value = newValue;
  };
  return [value, setState];
}

function State(props) {
  const [state, setState] = useState(0);

  const onClickHandler = () => {
    console.log("click!!");

    // setState는 값을 바꾸는 게 주목적이 아닌 화면을 재 렌더링 하는 게 주 목적
    setState(1);

    if (state === 1) {
      console.log("실행될까??");
    }
  };
  return <h1 onClick={onClickHandler}>State 테스트</h1>;
}

export default State;
