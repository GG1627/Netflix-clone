import React, { useState } from "react";
import "./PlayingScreen.css";
// import ChillVideo from "../images/Chill_Vid.mp4";
import placeHolderVid from "../images/placeHolderVideo.mp4";
import { useNavigate } from "react-router-dom";

function PlayingScreen() {
  const [isMuted, setIsMuted] = useState(true);
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const navigate = useNavigate();
  const handleExitClick = () => {
    navigate("/");
  };

  return (
    <div className="playingScreen">
      <video className="videoPlayer" autoPlay loop muted={isMuted}>
        <source src={placeHolderVid} type="video/mp4" />
      </video>
      <h1>
        I cannot legally stream movies nor do I have access to entire movies so
        enjoy this chill video ^-^
      </h1>
      <button onClick={toggleMute} className="muteButton">
        {isMuted ? "Unmute" : "Mute"}
      </button>
      <h2 onClick={handleExitClick} className="exitPlayingScreen">
        x
      </h2>
    </div>
  );
}

export default PlayingScreen;
