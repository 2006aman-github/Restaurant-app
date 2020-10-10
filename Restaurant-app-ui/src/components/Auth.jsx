import {
  Button,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import NavBar from "./NavBar";

function Auth({ isLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      let loginBody = {
        email: email,
        password: password,
      };
      console.log(JSON.stringify(loginBody));
      fetch("http://localhost:9000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginBody),
      })
        .then((res) => console.log(res.text()))
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    } else {
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // console.log("hello");
    let body = {
      name: name,
      email: email,
      password: password,
    };
    if (password === cnfPassword) {
      fetch("http://localhost:9000/users/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      history.replace("/login");
    }
  };

  return (
    <div class="auth__page">
      <NavBar />
      <div className="auth__form">
        {isLogin ? (
          <>
            <form onSubmit={handleLogin}>
              <h1>Login 🍔</h1>
              <br />
              <TextField
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                require
                label={email ? "Email" : "Required"}
                id="standard-basic"
                type="email"
              />
              <br />
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                label="Password"
                id="standard-basic"
                type="password"
              />
              <Button onClick={handleLogin} variant="contained" color="primary">
                Login
              </Button>
            </form>
            <br />
            <span>
              Dont Have an Account ? <Link to="/register">Register </Link>
              Here...
            </span>
          </>
        ) : (
          <>
            <form onSubmit={handleSignUp}>
              <h1>Register 🍳</h1>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                label="Your Full Name"
                id="standard-basic"
                type="text"
              />
              <br />
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                label="Email"
                id="standard-basic"
                type="email"
              />
              <br />
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                label="Password"
                id="standard-basic"
                type={"password"}
              />
              <br />
              <TextField
                value={cnfPassword}
                onChange={(e) => setCnfPassword(e.target.value)}
                required
                label="Confirm Password"
                id="standard-basic"
                type="password"
              />
              <Button
                onClick={handleSignUp}
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </form>
            <br />
            <span>
              Already Have an Account ? <Link to="/login">Login </Link>
              Here...
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;
