const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const productroutes = express.Router();
const PORT = 4000;

let Product_data = require("./productdetail.model");

app.use(cors);
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/product_details", {
  useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfullt");
});

productroutes.route("/").get(function(req, res) {
  Product_data.find(function(err, product) {
    if (err) {
      console.log(err);
    } else {
      res.json(product);
    }
  });
});

productroutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Product_data.findById(id, function(err, product) {
    res.json(product);
  });
});

productroutes.route("/add").post(function(req, res) {
  let product = new Product_data(req.body);
  product
    .save()
    .then(product => {
      res.status(200).json({ data: "data added successfully" });
    })
    .catch(err => {
      res.status(400).send("Adding a new data failed");
    });
});

productroutes.route("/uppdate/:id").post(function(req, res) {
  Product_data.findById(req.params.id, function(err, product) {
    if (!product) {
      res.status(404).send("Data not found");
    } else {
      product.product_code = req.body.product_code;
      product.product_name = req.body.product_name;
      product.brand = req.body.brand;
      product.cracker_type = req.body.cracker_type;
      product.amount = req.body.amount;

      product
        .save()
        .then(product => {
          res.json("Data Updated Successfully");
        })
        .catch(err => {
          res.status(400).send("Data Update failed");
        });
    }
  });
});

app.use("/product_details", productroutes);

app.listen(PORT, function() {
  console.log(`server is running on the port ${PORT}`);
});
