import React from "react";
import Fab from "./../../components/fab/Fab";
import Dialog from "./../../components/dialog/dialog";
import TextField from "@material-ui/core/TextField";
import SnackBar from "./../../components/snackbar/snackbar";
import Table from "./../../components/table/table";
import { withStyles } from "@material-ui/styles";
import SearchInput from "./../../components/searchinput/searchInput";
import axios from "axios";
import { connect } from "react-redux";
import { loadProductData } from "./../../redux/action/customerDetailsAction";
import SingleSelect from "./../../components/singleselect/singleselect";
import NumericInput from "./../../components/numericinput/numericinput";

const styles = {
  root: {
    width: "60%",
    margin: "auto"
  }
};

var defaultCatagory = [{ value: "" }, { value: "1", text: "Sample" }];
var defaultSupplier = [{ value: "" }, { value: "1", text: "supplier" }];

var measurement = [
  { value: "box", text: "1 Box" },
  { value: "pkt", text: "1 Pkt" }
];
var qunatity = [
  { value: "pcs", text: "Pcs" },
  { value: "chain", text: "Chain" }
];

const ProductMaster = props => {
  const [catagoryValue, setCatagoryValue] = React.useState("");
  const [supplierValue, setSupplierValue] = React.useState("");
  const [measureValue, setMeasureValue] = React.useState("");
  const [qunatityValue, setQuantityValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [messageContent, setMessageContent] = React.useState("");
  const [mode, setMode] = React.useState("");
  const [type, setType] = React.useState("");

  const productcoderef = React.createRef();
  const productnameref = React.createRef();
  const mrpRef = React.createRef();
  const purchaseRateRef = React.createRef();
  const quantityRef = React.createRef();

  const headerData = [
    "Product Code",
    "Product Name",
    "Brand",
    "Cracker Type",
    "Amount"
  ];

  const data = [];

  const onAddClick = () => {
    setOpen(true);
    setMode("add");
  };

  const onCancelClick = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpenSnack(false);
  };

  const onSaveClick = () => {
    if (productcoderef.current.value && productnameref.current.value) {
      const newTodo = {
        product_code: productcoderef.current.value,
        product_name: productnameref.current.value
      };

      setMessageContent("Data Added Successfully");
      setType("success");
      setOpen(false);
    } else {
      setMessageContent("Please Enter All the Fields");
      setType("error");
    }

    setOpenSnack(true);
  };

  function handleCatagoryChange(event) {
    setCatagoryValue(event.target.value);
  }
  function handleSupplierChange(event) {
    setSupplierValue(event.target.value);
  }

  function handleMeasurmentChange(event) {
    setMeasureValue(event.target.value);
  }
  function handleQunatityChange(event) {
    setQuantityValue(event.target.value);
  }
  function handleMenuClick() {}
  return (
    <div>
      <SearchInput placeholder="Search Product Name, Brand, Cracker Type" />
      <Fab id="productmaster-add" onClick={onAddClick} />
      <Table
        header={[
          "Product Code",
          "Product Name",
          "Catagory",
          "Supplier",
          "MRP",
          ""
        ]}
        data={[]}
        handleMenuClick={handleMenuClick}
        width={["15%", "25%", "20%", "20%", "15%", "5%"]}
      />
      <Dialog
        open={open}
        onCancelClick={onCancelClick}
        onSaveClick={onSaveClick}
        dialogTitle="Add New Product"
        saveButton
      >
        <TextField
          autoFocus={mode === "add"}
          label="Product Code"
          type="text"
          inputRef={productcoderef}
          fullWidth
        />
        <TextField
          label="Product Name"
          type="text"
          inputRef={productnameref}
          fullWidth
        />
        <SingleSelect
          label="Catagory"
          values={defaultCatagory}
          defaultValue={catagoryValue}
          id="catagory-code"
          handleChange={handleCatagoryChange}
        />
        <SingleSelect
          label="Supplier"
          values={defaultSupplier}
          defaultValue={supplierValue}
          id="supplier-code"
          handleChange={handleSupplierChange}
        />
        <NumericInput
          defaultValue={mode === "add" ? "" : ""}
          id="product-mrp"
          disabled={mode === "view"}
          ref={mrpRef}
          fullWidth
          label="MRP"
          precision={2}
        />
        <NumericInput
          defaultValue={mode === "add" ? "" : ""}
          id="purchase-rate"
          disabled={mode === "view"}
          ref={purchaseRateRef}
          fullWidth
          label="Purcahse Rate"
          precision={2}
        />
        <SingleSelect
          label="Measurement"
          values={measurement}
          defaultValue={measureValue}
          id="measurment-code"
          handleChange={handleMeasurmentChange}
        />
        <div style={{ display: "inline-flex" }}>
          <NumericInput
            defaultValue={mode === "add" ? "" : ""}
            id="qunatity-text-id"
            disabled={mode === "view"}
            ref={quantityRef}
            label="Quantity"
            style={{ width: "27%", bottom: "9px", marginRight: "8px" }}
            maxLength={4}
          />
          <SingleSelect
            values={qunatity}
            defaultValue={qunatityValue}
            id="qunatity-code"
            handleChange={handleQunatityChange}
          />
        </div>
      </Dialog>
      <SnackBar
        open={openSnack}
        message={messageContent}
        autoHideDuration={3000}
        type={type}
        handleClose={handleClose}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    productDetails: productData => dispatch(loadProductData(productData))
  };
};

const mapStateToProps = state => {
  return {
    productData: state.productData
  };
};

const ProductMasterData = withStyles(styles)(ProductMaster);

export default connect(mapStateToProps, mapDispatchToProps)(ProductMasterData);
