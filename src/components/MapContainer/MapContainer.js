import React, { Component } from "react";
import axios from "../../axios-stores";
import MyMap from "../MyMap/MyMap";

class MapContainer extends Component {
  state = {
    stores: [],
    loading: true,
    error: false,
    address: []
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
    return (
      <div>
        <MyMap
          stores={this.state.stores}
          width={"100vw"}
          height={"80vh"}
          zoom={10.5}
          latitude={51.227741}
          longitude={6.773456}
        />
      </div>
    );
  }
}

export default MapContainer;
