import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";
import { useNavigate } from "react-router-dom";

function Row({ title, fetchURL, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const base_url = "https://image.tmdb.org/t/p/original/";

  const handleMovieClick = (movie) => {
    console.log(movie.name || movie.title);
    navigate(`/more_info/${movie.name}`, { state: { movie } });
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                onClick={() => handleMovieClick(movie)}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                key={movie.id}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
