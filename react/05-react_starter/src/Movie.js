import React from "react";
import "./Movie.css";

function Movie(props) {
  return (
    <div className="movie">
      <img className="movie-img" />
      <div>
        <h2 className="movie-title"></h2>
        <span>제목</span>
        <h3 className="movie-year">2024</h3>
        <p>summary...</p>
        <ul className="movie-genres">
          <li>코미디</li>
          <li>액션</li>
          <li>호러</li>
        </ul>
      </div>
    </div>
  );
}

export default Movie;
