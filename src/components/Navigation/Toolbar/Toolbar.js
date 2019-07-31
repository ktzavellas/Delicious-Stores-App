import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import { Link } from "react-router-dom";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <div className={classes.Logo}>
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>
      <nav className={classes.Navbar}>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  );
};

export default toolbar;
