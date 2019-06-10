const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Product_Data = new Schema({
  product_code: {
    type: String
  },
  product_name: {
    type: String
  },
  brand: {
    type: String
  },
  cracker_type: {
    type: String
  },
  amount: {
    type: Number
  }
});

module.exports = mongoose.model("Product_data", Product_Data);