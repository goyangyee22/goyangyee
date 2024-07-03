import React from "react";

const RATINGS = [1, 2, 3, 4, 5];

function Star() {
  return <span>★</span>;
}

function Rating(props) {
  return (
    <div>
      {RATINGS.map((arrNum) => {
        <Star key={arrNum} />;
      })}
    </div>
    // key 값을 사용하는 이유: 각 요소가 고유하게 식별될 수 있기 위해
  );
}

export default Rating;
