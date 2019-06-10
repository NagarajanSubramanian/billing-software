const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Customer_Data = new Schema({
  customer_id: {
    type: String
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
  }
});

module.exports = mongoose.model("Customer_Data", Customer_Data);
