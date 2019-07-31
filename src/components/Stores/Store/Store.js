import React from "react";
import { Link } from "react-router-dom";
import image1 from "../../../assets/optimized/image8_result.jpg";
import { withRouter } from "react-router-dom";
import classes from "./Store.css";

const store = props => {
  return (
    <div className={classes.StoreContainer}>
      <div className={classes.Store}>
        <div>
          <li className={classes.ListItemName}>
            <Link to={"/stores/" + props.name}>{props.name}</Link>
          </li>
          <p>{props.description}</p>
        </div>
        <figure className={classes.FigureItem1}>
          <img src={image1} className={classes.Image} alt="" />
        </figure>
        <div className={classes.TagGroup}>
          {props.tags
            .map(item => item.name)
            .map(item => {
              return (
                <li className={classes.ListItemTag} key={item}>
                  <Link to={"/tags/" + item}>{item}</Link>
                </li>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default withRouter(store);
