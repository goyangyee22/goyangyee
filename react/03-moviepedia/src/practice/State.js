import React, { useState } from "react";

function State(props) {
  const [state, setState] = useState(0);

  const onClickHandler = () => {
    console.log("click!!");
  };
  return <h1 onClick={onClickHandler}>State 테스트</h1>;
}

export default State;
