import React from "react";
import TextField from "@material-ui/core/TextField";

const CustomerDetails = () => {
  return (
    <div>
      <TextField label="Customer Name" fullwidth />
      <TextField label="Address" multiline />
      <TextField label="Contact Number" fullwidth />
      <TextField label="Email" type="email" fullwidth />
    </div>
  );
};

export default CustomerDetails;
