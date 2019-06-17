import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Stores from "./components/Stores/Stores";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import { Route, Switch } from "react-router-dom";
import AddStoreForm from "./components/AddStoreForm/AddStoreForm";
import Tags from "./components/Tags/Tags";
import MapContainer from "./components/MapContainer/MapContainer";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/add" component={AddStoreForm} />
          <Route path="/stores" component={Stores} />
          <Route path="/tags" component={Tags} />
          <Route path="/login" component={Login} />
          <Route path="/map" component={MapContainer} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Home} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
