import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./Tags.css";
import image1 from "../../assets/optimized/image5_result.jpg";
import axios from "../../axios-stores";
import MatchedStores from "./MatchedStores/MatchedStores";
import { Route } from "react-router-dom";

class Tags extends Component {
  state = {
    stores: [],
    tagOptions: [
      "BUSINESS",
      "FAMILY",
      "OPEN LATE",
      "WIFI",
      "TRADITIONAL",
      "FAST FOOD"
    ],
    loading: true,
    error: false
  };
  componentDidMount() {
    axios
      .get("/stores.json")
      .then(response => {
        const fetchedStores = [];
        for (let key in response.data) {
          fetchedStores.push({
            ...response.data[key].storeData,
            id: key
          });
        }
        this.setState({ stores: fetchedStores, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }
  render() {
    const tagOptions = [...this.state.tagOptions];
    let tags = (
      <div className={classes.TagsDiv}>
        {tagOptions.map(item => {
          return (
            <li className={classes.Tags} key={item}>
              <Link to={this.props.match.path + "/" + item}>{item}</Link>
            </li>
          );
        })}
      </div>
    );
    return (
      <div className={classes.TagsContainer}>
        <figure className={classes.FigureItem1}>
          <img src={image1} className={classes.Image} alt="" />
        </figure>
        <div className={classes.TagsDivWrapper}>
          {tags}
          <Route
            path={this.props.match.path + "/:id"}
            render={() => <MatchedStores stores={this.state.stores} />}
          />
        </div>
      </div>
    );
  }
}

export default Tags;
