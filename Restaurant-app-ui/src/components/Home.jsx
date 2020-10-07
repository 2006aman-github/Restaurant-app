import React from "react";

import NavBar from "./NavBar";

function Home({ location }) {
  return (
    <div className="home">
      <NavBar />

      <div className="banner">
        <div className="banner__text">
          <h1>ENJOY</h1>
          <p>OUR DELICIOUS AND FINE CUISINES AT YOUR DOORSTEP</p>
        </div>
        <div className="banner__buttons">
          <button>MENU</button>
          <button>SIGN IN</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
