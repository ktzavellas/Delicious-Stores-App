import React from "react";
import classes from "./Register.css";

const Register = props => {
  return (
    <div className={classes.RegisterContainer}>
      <div className={classes.Register}>
        <h1>REGISTER</h1>
        <hr /> <br />
        <form action="" method="">
          <label>Name</label>
          <br />
          <input type="text" />
          <label>Email Address</label>
          <br />
          <input type="email" />
          <br />
          <label>Password</label>
          <br />
          <input type="password" />
          <br />
          <label>Confirm Password</label>
          <br />
          <input type="password" />
          <br />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
