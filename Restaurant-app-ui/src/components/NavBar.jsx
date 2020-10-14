import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function NavBar() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  return (
    <div className="navbar">
      <Link to="/">
        <div className="logo">FOODIES</div>
      </Link>
      <div className="navbar__right">
        {user ? (
          <li>
            Hello, {user.user.name.substr(0, user.user.name.indexOf(" "))}
          </li>
        ) : null}
        <Link to="/menu">
          <li>MENU</li>
        </Link>
        {user ? (
          <Link to="/orders">
            <li>ORDERS</li>
          </Link>
        ) : null}
        <Link to="/cart">
          <li>CART</li>
        </Link>
        {user ? (
          <form>
            <button
              onClick={(e) => {
                localStorage.setItem("token", "");
              }}
            >
              LOGOUT
            </button>
          </form>
        ) : (
          <Link to="/register">
            <button>SIGN UP</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
