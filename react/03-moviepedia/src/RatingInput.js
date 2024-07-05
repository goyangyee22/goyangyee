import React from "react";
import Rating from "./Rating";

function RatingInput({ inputName, setRating }) {
  const handleSelect = (nextValue) => {
    setRating(inputName, nextValue);
  };
  return (
    <div>
      <Rating selectRating={handleSelect} />
    </div>
  );
}

export default RatingInput;
