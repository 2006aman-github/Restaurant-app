import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Menu from "./components/Menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Auth from "./components/Auth";
import Cart from "./components/Cart";

// d2ea6f5fcd3ca442e5eddf1429511d5d
function App() {
  // APP KEY
  // 1a8a49d2e98164ae927468111ac6dc08

  // APP ID
  // 0e3b1be9

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <NavBar />
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
