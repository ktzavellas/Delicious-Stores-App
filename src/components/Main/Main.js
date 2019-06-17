import React from "react";
import classes from "./Main.css";

const Main = props => {
  return <main className={classes.Main}>{props.content}</main>;
};

export default Main;
