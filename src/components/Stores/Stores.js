import React, { Component } from "react";
import Store from "./Store/Store";
import SelectedStore from "./SelectedStore/SelectedStore";
import image1 from "../../assets/optimized/image5_result.jpg";
import { Route } from "react-router-dom";
import classes from "./Stores.css";
import axios from "../../axios-stores";

class Stores extends Component {
  state = {
    stores: [],
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
    let storesUpdated = [...this.state.stores];
    let stores = (
      <div className={classes.Stores}>
        {storesUpdated.map((item, index) => {
          return (
            <Store
              key={item.id}
              name={item.name}
              description={item.description}
              tags={item.types}
            />
          );
        })}
      </div>
    );
    if (this.props.location.pathname !== "/stores") {
      stores = null;
    }
    return (
      <div className={classes.StoresContainer}>
        <figure className={classes.FigureItem1}>
          <img src={image1} className={classes.Image} alt="" />
        </figure>
        {stores}
        <Route
          path={this.props.match.url + "/:id"}
          render={() => <SelectedStore stores={this.state.stores} />}
        />
      </div>
    );
  }
}

export default Stores;
