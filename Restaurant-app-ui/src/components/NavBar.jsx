import React from "react";

function NavBar() {
  return (
    <div className="navbar">
      <div className="logo">FOODIES</div>
      <div className="navbar__right">
        <li>HOME</li>
        <li>ABOUT</li>
        <li>MENU</li>
        <li>CONTACT</li>
        <button>SIGN UP</button>
      </div>
    </div>
  );
}

export default NavBar;
