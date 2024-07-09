import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import "./MovieApp.css";

function MovieApp(props) {
  const [movies, setMovies] = useState([]);
  const url = `https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=year`;
  return (
    <div className="container">
      <div className="movies">
        <Movie />
        <Movie />
      </div>
      ;
    </div>
  );
}

export default MovieApp;
