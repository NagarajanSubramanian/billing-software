import React from "react";
import "./App.css";
import CustomerMaster from "./customer/customermaster/CustomerMaster";
import SideDrawer from "./components/sidedrawer/SideDrawer";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SideDrawer />
      </React.Fragment>
    );
  }
}

export default App;
