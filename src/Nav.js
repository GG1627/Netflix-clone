import React, { useEffect, useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import GG_Logo from "./images/GG_Logo.png";
import Stickman_Avatar from "./images/stickman.jpg";

function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className="nav_contents">
        <img
          onClick={() => navigate("/")}
          className="nav_logo"
          src={GG_Logo}
          alt=""
        />

        <img
          onClick={() => navigate("/profile")}
          className="nav_avatar"
          src={Stickman_Avatar}
          alt=""
        />
      </div>
    </div>
  );
}

export default Nav;
