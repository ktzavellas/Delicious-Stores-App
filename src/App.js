import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Stores from "./components/Stores/Stores";
import Home from "./components/Home/Home";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import AddStoreForm from "./components/AddStoreForm/AddStoreForm";
import Tags from "./components/Tags/Tags";
import MapContainer from "./components/MapContainer/MapContainer";
import Auth from "./components/Auth/Auth";
import Logout from "./components/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onAutoAuthCheck();
  }
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/add" component={AddStoreForm} />
          <Route path="/stores" component={Stores} />
          <Route path="/tags" component={Tags} />
          <Route path="/map" component={MapContainer} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoAuthCheck: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
