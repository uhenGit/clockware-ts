import React from "react";
import { Link } from "react-router-dom";
import clock from "../assets/clock.svg";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src={clock} alt="to home page" title="To Home Page" />
      </Link>
      <div className="subheader_wrap">
        <h2>Clockwise Clockware</h2>
        <p>Give us Your problem</p>
        <p>and take a solution</p>
      </div>
    </header>
  );
};

export default Header;
