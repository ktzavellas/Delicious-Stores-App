import React from "react";
import classes from "./SelectedStore.css";
import { withRouter } from "react-router-dom";
import MyMap from "../../MyMap/MyMap";

const selectedStore = props => {
  const stores = [...props.stores];
  return (
    <div className={classes.SelectedStoreContainer}>
      <div className={classes.SelectedStore}>
        {stores
          .filter(item => {
            return item.name === props.match.params.id;
          })
          .map((item, index) => {
            return (
              <div key={item.id}>
                <h1>{item.name}</h1>
                <p className={classes.Description}>{item.description}</p>
                <MyMap
                  stores={[item]}
                  width={"100%"}
                  height={"35vh"}
                  zoom={14}
                  latitude={item.coordinates[1]}
                  longitude={item.coordinates[0]}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default withRouter(selectedStore);
