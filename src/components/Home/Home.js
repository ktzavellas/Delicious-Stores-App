import React from "react";
import image1 from "../../assets/optimized/image1_result.jpg";
import image2 from "../../assets/optimized/image2_result.jpg";
import image3 from "../../assets/optimized/image3_result.jpg";
import image4 from "../../assets/optimized/image4_result.jpg";
import { Link } from "react-router-dom";
import classes from "./Home.css";

const Home = props => {
  return (
    <div className={classes.Home}>
      <section className={classes.Intro}>
        <div>
          <h1>A world full of taste</h1>
          <p>
            Discover our delicious stores... <br />
            Add your own store and let the world know!{" "}
          </p>
          <li className={classes.LinkItem}>
            <Link to={"/stores"}>Stores</Link>
          </li>
          <li className={classes.LinkItem}>
            <Link to={"/add"}>Add</Link>
          </li>
        </div>
      </section>
      <figure className={classes.FigureItem1}>
        <img src={image1} className={classes.Image} alt="" />
      </figure>
      <figure className={[classes.FigureItem, classes.FigureItem2].join(" ")}>
        <img src={image2} className={classes.Image} alt="" />
      </figure>
      <figure className={[classes.FigureItem, classes.FigureItem3].join(" ")}>
        <img src={image3} className={classes.Image} alt="" />
      </figure>
      <figure className={[classes.FigureItem, classes.FigureItem4].join(" ")}>
        <img src={image4} className={classes.Image} alt="" />
      </figure>
    </div>
  );
};

export default Home;
