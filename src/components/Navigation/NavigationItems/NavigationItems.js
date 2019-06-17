import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = props => {
  return (
    <div className={classes.NavContainer}>
      <ul className={classes.NavigationItems}>
        <NavigationItem link={"/stores"} exact>
          STORES
        </NavigationItem>
        <NavigationItem link={"/tags"} exact>
          TAGS
        </NavigationItem>
        <NavigationItem link={"/add"}>ADD</NavigationItem>
        <NavigationItem link={"/map"}>MAP</NavigationItem>
      </ul>
      <ul className={classes.NavigationItems}>
        <NavigationItem link={"/register"}>REGISTER</NavigationItem>
        <NavigationItem link={"/login"}>LOGIN</NavigationItem>
      </ul>
    </div>
  );
};

export default NavigationItems;
