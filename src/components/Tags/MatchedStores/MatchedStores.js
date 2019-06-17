import React from "react";
import classes from "./MatchedStores.css";
import { withRouter } from "react-router-dom";
import Store from "../../Stores/Store/Store";

const matchedStores = props => {
  const stores = [...props.stores];
  let arrayOfMatchedStores = stores.filter(store => {
    return store.types
      .map(item => item.name)
      .some(name => name === props.match.params.id);
  });
  return (
    <div className={classes.matchedStoresContainer}>
      {arrayOfMatchedStores.map(item => {
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
};

export default withRouter(matchedStores);
