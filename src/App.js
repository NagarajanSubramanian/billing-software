import React from "react";
import "./App.css";
import SideDrawer from "./components/sidedrawer/sidedrawer";
import Spinner from "./../src/components/spinner/spinner";
import Maintanance from "./../src/components/maintanence/underMaintanence";

import { loadCatagory } from "./../src/redux/action/crackerAction";

import { connect } from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screenFlag: "loading"
    };
  }

  componentDidMount() {
    var self = this;

    fetch("http://localhost:8081/getAll")
      .then(res => res.json())
      .then(
        result => {
          self.setState({ screenFlag: "completed" });
          self.props.loadCatagory(result.catagory);
        },
        error => {
          self.setState({ screenFlag: "error" });
        }
      );
  }

  checkInitialScreen() {
    if (this.state.screenFlag === "loading") {
      return <Spinner />;
    } else if (
      this.state.screenFlag === "error" ||
      this.state.screenFlag === "fetchError"
    ) {
      return <Maintanance />;
    } else {
      return <SideDrawer />;
    }
  }

  render() {
    return <React.Fragment>{this.checkInitialScreen()}</React.Fragment>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCatagory: catagoryData => dispatch(loadCatagory(catagoryData))
  };
};

export default connect(null, mapDispatchToProps)(App);
