import React from "react";
import "./App.css";
import SideDrawer from "./components/sidedrawer/sidedrawer";
import Spinner from "./../src/components/spinner/spinner";
import Maintanance from "./../src/components/maintanence/underMaintanence";
import { BACKEND_URL } from "./constants/constants";

import {
  loadCatagory,
  loadSupplier,
  loadProduct
} from "./../src/redux/action/crackerAction";

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

    fetch(BACKEND_URL + "/getAll")
      .then(res => res.json())
      .then(
        result => {
          self.setState({ screenFlag: "completed" });
          self.props.loadCatagory(result.catagory);
          self.props.loadSupplier(result.supplier);
          self.props.loadProduct(result.product);
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
    loadCatagory: catagoryData => dispatch(loadCatagory(catagoryData)),
    loadSupplier: supplierData => dispatch(loadSupplier(supplierData)),
    loadProduct: productData => dispatch(loadProduct(productData))
  };
};

export default connect(null, mapDispatchToProps)(App);
