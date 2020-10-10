import React from "react";
import { Link } from "react-router-dom";

import NavBar from "./NavBar";

function Home({ location }) {
  return (
    <div className="home">
      <div className="banner">
        <div className="banner__text">
          <h1>ENJOY</h1>
          <p>OUR DELICIOUS AND FINE CUISINES AT YOUR DOORSTEP</p>
        </div>
        <div className="banner__buttons">
          <Link to="/menu">
            <button>MENU</button>
          </Link>
          <Link to="/login">
            <button>SIGN IN</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
