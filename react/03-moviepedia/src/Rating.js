import React from "react";
import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selectRating, rating, selected, onHover }) {
  const handleClick = () => {
    selectRating(rating);
  };

  return (
    <span className="Rating-star" onClick={handleClick} onMouseOver={onHover}>
      ★
    </span>
  );
}

function Rating({ selectRating, hoverRating, onHover }) {
  return (
    <div>
      {RATINGS.map((arrNum) => (
        <Star
          key={arrNum}
          selectRating={selectRating}
          rating={arrNum}
          selected={hoverRating}
          onHover={onHover}
        />
      ))}
    </div>
    // key 값을 사용하는 이유: 각 요소가 고유하게 식별될 수 있기 위해
  );
}

export default Rating;
