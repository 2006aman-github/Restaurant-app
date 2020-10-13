import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Menu from "./components/Menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Auth from "./components/Auth";
import Cart from "./components/Cart";
import { useStateValue } from "./StateProvider";
import axios from "./axios";
import CheckoutPage from "./components/CheckoutPage";

// d2ea6f5fcd3ca442e5eddf1429511d5d
function App() {
  const [{ userExists }, dispatch] = useStateValue();
  // APP KEY
  // 1a8a49d2e98164ae927468111ac6dc08

  // APP ID
  // 0e3b1be9
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
              user:{
                user: res.data.user
              }
            })
          }
        })
        .catch((err) => console.log(err.message));
      // localStorage.setItem("token", null);
    
    
  }, [])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {/* <NavBar /> */}
            <Home />
          </Route>
          <Route exact path="/menu">
            <NavBar />
            <Menu />
          </Route>
          <Route exact path="/login">
            <Auth isLogin={true} />
          </Route>
          <Route path="/register">
            <Auth isLogin={false} />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/checkout">
            <CheckoutPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
