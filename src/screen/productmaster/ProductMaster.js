import React from "react";
import ReactDOM from "react-dom";
import Fab from "./../../components/fab/Fab";
import Dialog from "./../../components/dialog/dialog";
import TextField from "@material-ui/core/TextField";
import SnackBar from "./../../components/snackbar/snackbar";
import Table from "./../../components/table/table";
import { withStyles } from "@material-ui/styles";
import SearchInput from "./../../components/searchinput/searchInput";
import { connect } from "react-redux";
import { loadProductData } from "./../../redux/action/customerDetailsAction";
import SingleSelect from "./../../components/singleselect/singleselect";
import NumericInput from "./../../components/numericinput/numericinput";
import MasterInput from "./../../components/masterinput/masterinput";
import EmptyData from "./../../components/emptydata/emptyData";
import ConfimationDialog from "./../../components/confimationdialog/confirmationDialog";
import FormControl from "@material-ui/core/FormControl";
import { BACKEND_URL } from "./../../constants/constants";
import InputLabel from "@material-ui/core/InputLabel";
import FormDialog from "./../../components/dialog/dialog";

const styles = {
  root: {
    width: "60%",
    margin: "auto"
  }
};

var measurement = [
  { value: "1", text: "1 Box" },
  { value: "2", text: "1 Pkt" }
];
var qunatity = [
  { value: "1", text: "Pcs" },
  { value: "2", text: "Chain" }
];

const ProductMaster = props => {
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [measureValue, setMeasureValue] = React.useState("1");
  const [qunatityValue, setQuantityValue] = React.useState("2");
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [messageContent, setMessageContent] = React.useState("");
  const [mode, setMode] = React.useState("");
  const [type, setType] = React.useState("");

  const [confimationTitle, setConfimationTitle] = React.useState(
    "Confirmation"
  );
  const [confirmationContent, setConfimationContent] = React.useState(
    "Do you want to add record?"
  );

  const [searchValue, setSearchValue] = React.useState("");
  const [okLabel, setOkLabel] = React.useState("YES");
  const [cancelLabel, setCancelLabel] = React.useState("NO");
  const [okLabelFocus, setOKLabelFocus] = React.useState(true);
  const [cancelLabelFocus, setCancelLabelFocus] = React.useState(false);
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [okButtonColor, setOkButtonColor] = React.useState("primary");
  const [cancelButtonColor, setCancelButtonColor] = React.useState("primary");

  const [emptyDataHeader, setEmptyDataHeader] = React.useState("No Data Found");
  const [emptyDataDescription, setEmptyDataDescription] = React.useState(
    "Please add new Product"
  );
  const [gridSelectData, setSelectedGridData] = React.useState({});

  const catagoryRef = React.createRef();
  const supplierRef = React.createRef();
  const productcoderef = React.createRef();
  const productnameref = React.createRef();
  const mrpRef = React.createRef();
  const purchaseRateRef = React.createRef();
  const quantityRef = React.createRef();

  function handleConfirmationOk() {
    var currentData = {};
    currentData["productCode"] = productcoderef.current.value;
    currentData["productName"] = productnameref.current.value;
    currentData["catagoryId"] = catagoryRef.current.getAttribute("keyid");
    currentData["supplierId"] = supplierRef.current.getAttribute("keyid");
    currentData["productMrp"] = mrpRef.current.value;
    currentData["productPurchaseRate"] = purchaseRateRef.current.value;
    currentData["productMeasurementId"] = measureValue;
    currentData["productQuantity"] = quantityRef.current.value;
    currentData["productQuantityScale"] = qunatityValue;
    currentData["searchValue"] = searchValue;
    currentData["searchField"] = [
      "productCode",
      "productName",
      "catagoryName",
      "supplierName"
    ];

    currentData["mode"] = mode;
    fetch(BACKEND_URL + "/insertProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentData)
    })
      .then(res => res.json())
      .then(
        data => {
          if (mode === "add") {
            if (data["status"] === "exist") {
              setMessageContent("Product Code or Name already exists.");
              setType("error");
              setOpenSnack(true);
            } else {
              props.productDetails(data["product"]);
              setType("success");
              setMessageContent("Product added successfully.");
              setOpenSnack(true);
              setOpen(false);
            }
          } else {
            if (data["status"] === "notexist") {
              setMessageContent("Product already deleted.");
              setType("error");
              setOpenSnack(true);
            } else {
              props.productDetails(data["product"]);
              setType("success");
              setMessageContent("Product updated successfully.");
              setOpenSnack(true);
              setOpen(false);
            }
          }
          setConfirmationOpen(false);
        },
        error => {}
      );
  }

  function handleConfirmationClose() {
    setConfirmationOpen(false);
    productcoderef.current.focus();
  }

  const onAddClick = () => {
    setMode("add");
    setDialogTitle("Add Product");
    setOpen(true);
  };

  const onCancelClick = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpenSnack(false);
  };

  const onSaveClick = () => {
    if (
      productcoderef.current.value &&
      productnameref.current.value &&
      mrpRef.current.value &&
      purchaseRateRef.current.value &&
      quantityRef.current.value &&
      catagoryRef.current.getAttribute("keyid") &&
      supplierRef.current.getAttribute("keyid") &&
      measureValue &&
      qunatityValue
    ) {
      if (mode === "add") {
        setConfimationContent("Do you want to add product?");
      } else {
        setConfimationContent("Do you want to update product?");
      }
      setConfirmationOpen(true);
    } else {
      if (mode === "add") {
        productcoderef.current.focus();
      } else {
        productnameref.current.focus();
      }
      setOpenSnack(true);
      setType("error");
      setMessageContent("Enter all fields.");
    }
  };

  function handleMeasurmentChange(event) {
    setMeasureValue(event.target.value);
  }
  function handleQunatityChange(event) {
    setQuantityValue(event.target.value);
  }

  var headerProperty = [
    {
      filed: "no",
      visible: true,
      headerName: "No",
      align: "center",
      headerAlign: "center",
      type: "number",
      commaSeparate: false
    },
    {
      field: "productCode",
      visible: true,
      headerName: "Product Code",
      align: "left",
      headerAlign: "center",
      type: "string",
      commaSeparate: false
    },
    {
      field: "productName",
      visible: true,
      headerName: "Product Name",
      align: "left",
      headerAlign: "center",
      type: "string",
      commaSeparate: false
    },
    {
      field: "catagoryName",
      visible: true,
      headerName: "Catagory",
      align: "left",
      headerAlign: "center",
      type: "string",
      commaSeparate: false
    },
    {
      field: "supplierName",
      visible: true,
      headerName: "Supplier",
      align: "left",
      headerAlign: "center",
      type: "string",
      commaSeparate: false
    },
    {
      field: "productMrp",
      visible: true,
      headerName: "MRP",
      align: "center",
      headerAlign: "center",
      type: "number",
      commaSeparate: true
    }
  ];

  function handleMenuClick(data) {
    var value = props.productData.filter(
      value => value.productCode === data.id
    );
    setMode(data.menuId);
    if (value.length > 0) {
      setSelectedGridData(value[0]);
      setMeasureValue(value[0].productMeasurementId);
      setQuantityValue(value[0].productQuantityScale);
      setOpen(true);
      if (data.menuId === "view") {
        setDialogTitle("View Product");
        // setTimeout(() => cancelButtonRef.current.focus(), 100);
      } else {
        setDialogTitle("Edit product");
      }
    }
  }

  const searchOnChange = event => {
    var searchData = event.currentTarget.value
      ? event.currentTarget.value.trim()
      : "";
    setSearchValue(searchData);
    fetch(BACKEND_URL + "/searchProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchValue: searchData,
        searchField: [
          "productCode",
          "productName",
          "catagoryName",
          "supplierName"
        ]
      })
    })
      .then(res => res.json())
      .then(
        data => {
          if (data.length <= 0) {
            setEmptyDataDescription("Please search with some other keyword.");
          }
          props.productDetails(data);
        },
        error => {}
      );
  };

  var dialogId = "poduct-add-dialog";
  return (
    <div>
      <SearchInput
        placeholder="Search Product Name, Brand, Cracker Type"
        onChange={searchOnChange}
      />
      <EmptyData
        emptyDataShow={props.productData <= 0}
        emptyDataHeader={emptyDataHeader}
        emptyDataDescription={emptyDataDescription}
      />
      <Fab id="productmaster-add" onClick={onAddClick} />
      <Table
        id="catagory-table"
        header={headerProperty}
        fieldId="productCode"
        numberFiled="no"
        searchData={searchValue}
        searchColumn={[
          "productCode",
          "productName",
          "catagoryName",
          "supplierName"
        ]}
        data={props.productData}
        contextMenu={true}
        handleMenuClick={handleMenuClick}
        width={["8%", "13%", "25%", "18%", "18%", "14%", "5%"]}
      />
      <FormDialog
        open={open}
        id={dialogId}
        saveButton={mode !== "view"}
        onCancelClick={onCancelClick}
        onSaveClick={onSaveClick}
        dialogTitle={dialogTitle}
      >
        <TextField
          autoFocus={mode === "add"}
          label="Product Code"
          type="text"
          inputRef={productcoderef}
          defaultValue={mode !== "add" ? gridSelectData.productCode : ""}
          disabled={mode === "view"}
          fullWidth
        />
        <TextField
          label="Product Name"
          type="text"
          autoFocus={mode === "edit"}
          inputRef={productnameref}
          defaultValue={mode !== "add" ? gridSelectData.productName : ""}
          disabled={mode === "view"}
          fullWidth
        />
        <MasterInput
          id="catagory-master-input"
          ref={catagoryRef}
          parentId={dialogId}
          keyId={mode !== "add" ? gridSelectData.catagoryId : ""}
          keyName={mode !== "add" ? gridSelectData.catagoryName : ""}
          fullWidth
          label="Catagory"
          masterId="catagory_name_master"
          defaultValue={mode !== "add" ? gridSelectData.catagoryName : ""}
          disabled={mode === "view"}
        />
        <MasterInput
          id="supplier-master-input"
          ref={supplierRef}
          parentId={dialogId}
          fullWidth
          keyId={mode !== "add" ? gridSelectData.supplierId : ""}
          keyName={mode !== "add" ? gridSelectData.supplierName : ""}
          defaultValue={mode !== "add" ? gridSelectData.supplierName : ""}
          disabled={mode === "view"}
          label="Supplier"
          masterId="supplier_name_master"
        />
        <NumericInput
          defaultValue={mode === "add" ? "" : ""}
          id="product-mrp"
          disabled={mode === "view"}
          ref={mrpRef}
          fullWidth
          defaultValue={mode !== "add" ? gridSelectData.productMrp : ""}
          disabled={mode === "view"}
          label="MRP"
          commaSeparate={true}
          precision={2}
        />
        <NumericInput
          defaultValue={mode === "add" ? "" : ""}
          id="purchase-rate"
          disabled={mode === "view"}
          ref={purchaseRateRef}
          fullWidth
          label="Purcahse Rate"
          defaultValue={
            mode !== "add" ? gridSelectData.productPurchaseRate : ""
          }
          disabled={mode === "view"}
          commaSeparate={true}
          precision={2}
        />
        <FormControl disabled={mode === "view"} style={{ display: "block" }}>
          <InputLabel id="measurement-label">Measurement</InputLabel>
          <SingleSelect
            labelId="measurement-label"
            style={{ margin: "0px" }}
            values={measurement}
            defaultValue={measureValue}
            id="measurment-code"
            disabled={mode === "view"}
            handleChange={handleMeasurmentChange}
          />
        </FormControl>
        <div style={{ display: "inline-flex" }}>
          <NumericInput
            defaultValue={mode === "add" ? "" : ""}
            id="qunatity-text-id"
            disabled={mode === "view"}
            ref={quantityRef}
            label="Quantity"
            defaultValue={mode !== "add" ? gridSelectData.productQuantity : ""}
            disabled={mode === "view"}
            style={{ width: "27%", bottom: "9px", marginRight: "8px" }}
            maxLength={4}
          />
          <FormControl disabled={mode === "view"}>
            <SingleSelect
              values={qunatity}
              defaultValue={qunatityValue}
              id="qunatity-code"
              disabled={mode === "view"}
              handleChange={handleQunatityChange}
              native={true}
            />
          </FormControl>
        </div>
      </FormDialog>
      <SnackBar
        open={openSnack}
        message={messageContent}
        autoHideDuration={3000}
        type={type}
        handleClose={handleClose}
      />
      <ConfimationDialog
        id="product-add-confiramtion"
        dialogTitle={confimationTitle}
        dialogContent={confirmationContent}
        okLabel={okLabel}
        cancelLabel={cancelLabel}
        okButtonColor={okButtonColor}
        cancelButtonColor={cancelButtonColor}
        okLabelFocus={okLabelFocus}
        cancelLabelFocus={cancelLabelFocus}
        open={confirmationOpen}
        handleOk={handleConfirmationOk}
        handleClose={handleConfirmationClose}
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
    productData: state.loadProduct
  };
};

const ProductMasterData = withStyles(styles)(ProductMaster);

export default connect(mapStateToProps, mapDispatchToProps)(ProductMasterData);
