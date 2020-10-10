import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <Link to="/">
        <div className="logo">FOODIES</div>
      </Link>
      <div className="navbar__right">
        <li>Hello, Aman</li>

        <Link to="/menu">
          <li>MENU</li>
        </Link>
        <li>ORDERS</li>
        <Link to="/cart">
          <li>CART</li>
        </Link>
        <Link to="/register">
          <button>SIGN UP</button>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
