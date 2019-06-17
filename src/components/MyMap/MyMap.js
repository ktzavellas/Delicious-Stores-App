import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import classes from "./MyMap.css";
import Pointer from "../Pointer/Pointer";
import { Link } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";

const MyMap = props => {
  const [viewport, setViewport] = useState({
    latitude: props.latitude,
    longitude: props.longitude,
    width: props.width,
    height: props.height,
    zoom: props.zoom
  });

  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <ReactMapGL
      {...viewport}
      width={props.width}
      height={props.height}
      mapboxApiAccessToken={process.env.REACT_APP_stores_token}
      onViewportChange={viewport => {
        setViewport(viewport);
      }}
      //mapStyle="mapbox://styles/konstantinos1982/cjwmgpdtv0gak1cpdin1wml3k"
      mapStyle="mapbox://styles/konstantinos1982/cjwnfgfif0khr1cmqqrn0qdyf"
    >
      {props.stores.map(item => {
        return (
          <Marker
            key={item.id}
            latitude={item.coordinates[1]}
            longitude={item.coordinates[0]}
          >
            <Pointer
              onClick={e => {
                e.preventDefault();
                setSelectedStore(item);
              }}
            />
          </Marker>
        );
      })}
      {selectedStore ? (
        <Popup
          anchor="top"
          onClose={() => {
            setSelectedStore(null);
          }}
          dynamicPosition={false}
          tipSize={0}
          latitude={selectedStore.coordinates[1]}
          longitude={selectedStore.coordinates[0]}
        >
          <div className={classes.Popup}>
            <li className={classes.ListItemName}>
              <Link to={"/stores/" + selectedStore.name}>
                {selectedStore.name}
              </Link>
            </li>
            <hr />
            <p>
              {`${selectedStore.street}`}
              <br />
              {`${selectedStore.zipCode}`}
            </p>
          </div>
        </Popup>
      ) : null}
    </ReactMapGL>
  );
};

export default MyMap;
