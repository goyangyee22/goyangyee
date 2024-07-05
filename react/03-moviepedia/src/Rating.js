import React from "react";
import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selectRating, rating, selected, onHover }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;
  const handleClick = selectRating ? () => selectRating(rating) : undefined;
  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      ★
    </span>
  );
}

function Rating({ selectRating, hoverRating, onHover, onMouseOut }) {
  return (
    <div onMouseOut={onMouseOut}>
      {RATINGS.map((arrNum) => (
        <Star
          key={arrNum}
          selectRating={selectRating}
          rating={arrNum}
          selected={hoverRating >= arrNum}
          onHover={onHover}
        />
      ))}
    </div>
    // key 값을 사용하는 이유: 각 요소가 고유하게 식별될 수 있기 위해
  );
}

export default Rating;
