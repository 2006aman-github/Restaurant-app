import Axios from "axios";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import axios from "../axios";
import NavBar from "./NavBar";

function Home({ location }) {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    axios
      .get("/user/verify", {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.verified) {
          dispatch({
            type: "ADD_USER",
            user: {
              user: res.data.user,
            },
          });
        }
        console.log("added user");
      })
      .catch((err) => console.log(err.message));
  }, []);
  if (user) {
    history.replace("/menu");
  }

  return (
    <div className="home">
      <NavBar />
      <div className="banner">
        <div className="banner__text">
          <h1>ENJOY</h1>
          <p>OUR DELICIOUS AND FINE CUISINES AT YOUR DOORSTEP</p>
        </div>
        <div className="banner__buttons">
          <Link to="/menu">
            <button>MENU</button>
          </Link>
          {user ? (
            <button>LOGOUT</button>
          ) : (
            <>
              <Link to="/login">
                <button>SIGN IN</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
