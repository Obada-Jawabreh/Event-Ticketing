import React, { useState } from "react";

import { Link } from "react-router-dom";

function Navbar() {
  const [isactive, setisactive] = useState("false");
  function Toggle() {
    setisactive(!isactive);
  }
  return (
    <div className="containerr">
      <div className="navbar">
        <img src="" alt="logo" className="w-72 h-20" />
        <button
          className={isactive ? "active" : "null"}
          onClick={Toggle}
          id="burger-menu"
        >
          &#9776;
        </button>
        <div className="nav-item" id="nav-item">
          <a href="">home</a>
          <a href="">Contactus</a>
          <a href="">myaccount</a>

          <div></div>
          <a className="b" href="">
            login
          </a>
        </div>
        <div className="hidd"></div>
      </div>
    </div>
  );
}

export default Navbar;
