import React from "react";
import "./App.css";
import CustomerDetails from "./customer/customerdetails/customerdetails";
import Toastr from "./components/toastr/toastr";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.customerRef = {
      customerName: React.createRef(),
      customerAddress: React.createRef(),
      customerEmail: React.createRef(),
      customerMobile: React.createRef()
    };

    this.onCancelClick = this.onCancelClick.bind(this);
    this.onCustomerSaveClick = this.onCustomerSaveClick.bind(this);

    this.state = {
      dialogShow: true,
      toastShow: false,
      toastColor: "",
      toastData: ""
    };
  }

  onCancelClick() {
    alert();
  }

  onCustomerSaveClick(data) {
    const { name, address, email, mobile } = data;
    if (name && address && email && mobile) {
      if (mobile.length > 10 || mobile.length < 10) {
        this.setState({
          toastColor: "red",
          toastData: "Enter proper mobile number",
          toastShow: true
        });
        setTimeout(
          function() {
            this.setState({ toastShow: false });
          }.bind(this),
          2000
        );
      }
    } else {
      this.setState({
        toastColor: "red",
        toastData: "Enter all details.",
        toastShow: true
      });
      setTimeout(
        function() {
          this.setState({ toastShow: false });
        }.bind(this),
        2000
      );
    }
  }

  render() {
    const { dialogShow, toastColor, toastData, toastShow } = this.state;
    return (
      <React.Fragment>
        <CustomerDetails
          ref={this.customerRef}
          dialogShow={dialogShow}
          onCancelClick={() => this.onCancelClick()}
          onSaveClick={data => this.onCustomerSaveClick(data)}
        />
        <Toastr
          toastShow={toastShow}
          toastColor={toastColor}
          toastData={toastData}
        />
      </React.Fragment>
    );
  }
}

export default App;
