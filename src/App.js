import React from "react";
import "./App.css";
import CustomerDetails from "./customer/customermaster/CustomerMaster";
import SideDrawer from "./components/sidedrawer/SideDrawer";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SideDrawer />
        <CustomerDetails />
      </React.Fragment>
    );
  }
}

export default App;
