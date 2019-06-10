import React from "react";
import "./App.css";
import { Provider } from 'react-redux';
import store from './redux/store';
import SideDrawer from "./components/sidedrawer/sidedrawer";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SideDrawer />
      </Provider>
    );
  }
}

export default App;
