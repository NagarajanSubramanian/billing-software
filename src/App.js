import React from "react";
import "./App.css";
import SideDrawer from "./components/sidedrawer/sidedrawer";

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
