import React from "react";
import "./MoreInfoScreen.css";
import { useLocation, useNavigate } from "react-router-dom";

function MoreInfoScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  const { movie } = location.state;

  function truncate(string) {
    return string?.length > 5 ? string.substr(0, 4) : string;
  }

  const handlePlayClick = () => {
    navigate("/playing");
  };

  const handleNotWorkingButton = () => {
    alert("This button does not do anything right now.");
  };

  return (
    <div className="moreInfoScreen">
      <div className="moreInfoScreen_info">
        <h1>
          <strong>{movie.name}</strong>
        </h1>
        <h4>{truncate(movie.release_date || movie.first_air_date)}</h4>
        <h2>{movie.overview}</h2>
        <h2>{movie.genres}</h2>
        <div className="moreInfoScreen_buttons">
          <button onClick={handlePlayClick} className="play_button">
            Play
          </button>
          <button onClick={handleNotWorkingButton}>Trailers & More</button>
          <button onClick={handleNotWorkingButton}>More Like This</button>
        </div>
      </div>
      <img
        className="moreInfoScreen_image"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.name}
      />
      <div className="moreInfoScreen--fadeBottom" />
      <div className="moreInfoScreen--fadeMiddle" />
    </div>
  );
}

export default MoreInfoScreen;
