import React from "react";
import classes from "./Login.css";
const Login = props => {
  return (
    <div className={classes.LoginContainer}>
      <div className={classes.Login}>
        <div>
          <h1>LOGIN</h1>
          <hr /> <br />
          <form action="" method="">
            <label>Email Address</label>
            <br />

            <input type="text" />
            <br />
            <label>Password</label>
            <br />
            <input type="email" />
            <br />
            <button type="submit">LOG IN</button>
          </form>
        </div>
        <div>
          <h1>I FORGOT MY PASSWORD</h1>
          <hr /> <br />
          <form action="" method="">
            <label>Email</label>
            <br />
            <input type="email" />
            <br />
            <button type="submit">SEND A RESET</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
