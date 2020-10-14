import { Button, Collapse, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { Link, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import { useStateValue } from "../StateProvider";
import * as Joi from "joi-browser";

const LoginSchema = {
  email: Joi.string().min(10).required().email(),
  password: Joi.string().min(6).required(),
};
const RegisterSchema = {
  email: Joi.string().min(10).required().email(),
  name: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
};

function Auth({ isLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [openAlert, setOpenAlert] = useState("");
  const [PasswordError, setPasswordError] = useState(false);
  const [EmailError, setEmailError] = useState(false);
  const [NameError, setNameError] = useState(false);
  const [cnfPasswordError, setCnfPasswordError] = useState(false);

  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();

  let loginBody = {
    email: email,
    password: password,
  };
  if (user) {
    history.replace("/menu");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    let validation = Joi.validate(loginBody, LoginSchema);

    if (validation?.error?.details) {
      if (validation.error?.details[0].message.includes("email")) {
        setEmailError((e) => validation.error?.details[0].message);
      } else if (validation.error?.details[0].message.includes("password")) {
        setPasswordError((e) => validation.error?.details[0].message);
      }
    } else {
      await fetch("https://mern-restaurant-app.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginBody),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Email or Password is incorrect") {
            setEmailError(data.message);
            setPasswordError(data.message);
          } else {
            localStorage.setItem("token", data.message);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    let Registerbody = {
      name: name,
      email: email,
      password: password,
    };
    let validation = Joi.validate(Registerbody, RegisterSchema);
    if (validation?.error?.details) {
      if (validation.error?.details[0].message.includes("email")) {
        setEmailError((e) => validation.error?.details[0].message);
      } else if (validation.error?.details[0].message.includes("password")) {
        setPasswordError((e) => validation.error?.details[0].message);
      } else if (validation.error?.details[0].message.includes("name")) {
        setNameError((e) => validation.error?.details[0].message);
      }
    } else if (password !== cnfPassword) {
      setCnfPasswordError("Password Doesn't Match..");
    } else {
      await fetch("http://localhost:9000/users/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Registerbody),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Email Already Exists") {
            // setOpenAlert(data.message);
            setEmailError(data.message);
          } else {
            history.replace("/login");
          }
        })
        .catch((err) => console.log(err.message));
    }
  };
  return (
    <div class="auth__page">
      <NavBar />
      <Collapse in={openAlert ? true : false}>
        <Alert
          className="alert"
          severity="error"
          onClose={(e) => setOpenAlert(false)}
          variant="filled"
        >
          {openAlert}
        </Alert>
      </Collapse>
      <div className="auth__form">
        {isLogin ? (
          <>
            <form onSubmit={handleLogin}>
              <h1>Login 🍔</h1>
              <br />
              <TextField
                error={EmailError ? true : false}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                require
                label={"Email"}
                id="standard-basic"
                type="email"
                helperText={EmailError}
              />
              <br />
              <TextField
                error={PasswordError ? true : false}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                label={"Password"}
                id="standard-basic"
                type="password"
                helperText={PasswordError}
              />
              <Button onClick={handleLogin} variant="contained" color="primary">
                Login
              </Button>
            </form>
            <br />
            <span>
              Dont Have an Account ? <Link to="/register">Register </Link>
              Here.
            </span>
          </>
        ) : (
          <>
            <form onSubmit={handleSignUp}>
              <h1>Register 🍳</h1>
              <TextField
                error={NameError ? true : false}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                label="Your Full Name"
                id="standard-basic"
                type="text"
                helperText={NameError}
              />
              <br />
              <TextField
                error={EmailError ? true : false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                label="Email"
                id="standard-basic"
                type="email"
                helperText={EmailError}
              />
              <br />
              <TextField
                error={PasswordError ? true : false}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                label="Password"
                id="standard-basic"
                type={"password"}
                helperText={PasswordError}
              />
              <br />
              <TextField
                error={cnfPasswordError ? true : false}
                value={cnfPassword}
                onChange={(e) => setCnfPassword(e.target.value)}
                required
                label="Confirm Password"
                id="standard-basic"
                type="password"
                helperText={cnfPasswordError}
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
