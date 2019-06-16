import React from "react";
import "./App.css";
import SideDrawer from "./components/sidedrawer/sidedrawer";
import Spinner from './../src/components/spinner/spinner';
import Maintanance from './../src/components/maintanence/underMaintanence';

import { loadCustomer } from './../src/redux/action/customerDetailsAction';

import { connect } from 'react-redux';
import axios from "axios";

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      screenFlag: 'loading'
    }
  }

  componentDidMount(){
    var self = this;
    axios.post("http://localhost:4000/products/loadInitialData").then(function(initialData){
      if(!initialData.data.error){
        self.setState({screenFlag: 'completed'});
        const customerData = initialData.data.customerData.map(data => {
          return {
            id: data.customer_id,
            name: data.name,
            address: data.address,
            phoneNo: data.phone,
            email: data.email,
            contextMenu: ''
          }
        });
        self.props.loadCustomer(customerData)
      } else {
        self.setState({screenFlag: 'fetchError'});
      }
    }).catch(function(err){
      self.setState({screenFlag: 'error'});
    });
  }

  checkInitialScreen () {
    if(this.state.screenFlag === 'loading'){
      return <Spinner/>;
    } else if(this.state.screenFlag === 'error' || this.state.screenFlag === 'fetchError'){
      return <Maintanance/>;
    } else {
      return <SideDrawer />;
    }
  }

  render() {
    return (
      <React.Fragment>
       {this.checkInitialScreen()}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCustomer : (customerData) => dispatch(loadCustomer(customerData))
  }
}

export default connect(null, mapDispatchToProps)(App);
