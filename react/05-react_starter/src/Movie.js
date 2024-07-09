import React from "react";
import "./Movie.css";

function Movie({ img, title, year, summary, genres }) {
  return (
    <div className="movie">
      <img className="movie-img" src={img} />
      <div>
        <h2 className="movie-title"></h2>
        <span>{title}</span>
        <h3 className="movie-year">{year}</h3>
        <p className="movie-summary">
          {summary.length > 235 ? `${summary.slice(0, 235)}` : summary}
        </p>
        <ul className="movie-genres">
          {genres.map((genre, idx) => (
            <li key={idx}>{genre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Movie;
