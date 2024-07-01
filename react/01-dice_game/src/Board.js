import React from "react";
import blueOne from "./assets/dice-blue-1.svg";
import redOne from "./assets/dice-red-1.svg";

function Board(props) {
  return (
    <div className="App-board">
      <h2>나</h2>
      <img src={blueOne} />
      <h2>총점</h2>
      <p>4</p>
      <h2>기록</h2>
      <p>1, 3</p>
    </div>
  );
}

export default Board;
