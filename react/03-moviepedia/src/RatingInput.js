import React, { useState } from "react";
import Rating from "./Rating";

function RatingInput({ inputName, setRating }) {
  // ratingValue State는 별을 색칠하는 용도의 점수
  const [ratingValue, setRatingValue] = useState(0);

  // 실제 values.rating을 바꾸는 함수는 setRating
  // 이 함수를 실행하는 시기는 Star 컴포넌트의 onClick의 시점
  const handleSelect = (nextValue) => {
    setRating(inputName, nextValue);
  };
  return (
    <div>
      <Rating
        selectRating={handleSelect}
        hoverRating={ratingValue}
        onHover={setRatingValue}
      />
    </div>
  );
}

export default RatingInput;
