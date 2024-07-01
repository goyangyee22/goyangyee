import React from "react";

function Board({ name, result, gameHistory }) {
  return (
    <div className="App-board">
      <h2>{name}</h2>
      <Go result={result} />
    </div>
  );
}

export default Board;
