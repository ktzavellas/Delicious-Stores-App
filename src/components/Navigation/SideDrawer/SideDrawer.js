import React from "react";
import Logo from "../../Logo/Logo";
import LogoSM from "../../Logo/LogoSM/LogoSM";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { Link } from "react-router-dom";
import Aux from "../../../hoc/Aux/Aux";

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop clicked={props.closed} show={props.open} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>
        <div className={classes.LogoSM}>
          <Link to={"/"}>
            <LogoSM />
          </Link>
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
