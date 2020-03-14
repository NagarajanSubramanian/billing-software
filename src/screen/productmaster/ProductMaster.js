import React from "react";
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
import { BACKEND_URL } from "./../../constants/constants";

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
  const [measureValue, setMeasureValue] = React.useState("1");
  const [qunatityValue, setQuantityValue] = React.useState("2");
  const [open, setOpen] = React.useState(true);
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
    currentData["catagoryId"] = catagoryRef.current.getAttribute("keyId");
    currentData["supplierId"] = supplierRef.current.getAttribute("keyId");
    currentData["productMrp"] = mrpRef.current.value;
    currentData["productPurchaseRate"] = purchaseRateRef.current.value;
    currentData["productMeasurementId"] = measureValue;
    currentData["productQuantity"] = quantityRef.current.value;
    currentData["productQuantityScale"] = qunatityValue;

    currentData["mode"] = mode;
    fetch(BACKEND_URL + "/insertProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentData)
    })
      .then(res => res.text())
      .then(
        data => {
          if (mode === "add") {
            if (data === "exist") {
              setMessageContent("Product Code or Name already exists.");
              setType("error");
              setOpenSnack(true);
            } else {
              setOpenSnack(true);
              setType("success");
              setMessageContent("Product added successfully.");
              setOpen(false);
            }
          } else {
            if (data === "exist") {
              setMessageContent("Product already deleted.");
              setType("error");
              setOpenSnack(true);
            } else {
              setOpenSnack(true);
              setType("success");
              setMessageContent("Product updated successfully.");
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
      catagoryRef.current.getAttribute("keyId") &&
      supplierRef.current.getAttribute("keyId") &&
      measureValue &&
      qunatityValue
    ) {
      setConfirmationOpen(true);
    } else {
      productcoderef.current.focus();

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
      field: "catagoryId",
      visible: true,
      headerName: "Catagory",
      align: "left",
      headerAlign: "center",
      type: "string",
      commaSeparate: false
    },
    {
      field: "supplierId",
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

  function handleMenuClick() {}
  var dialogId = "poduct-add-dialog";
  return (
    <div>
      <SearchInput placeholder="Search Product Name, Brand, Cracker Type" />
      <EmptyData
        emptyDataShow={true}
        emptyDataHeader={emptyDataHeader}
        emptyDataDescription={emptyDataDescription}
      />
      <Fab id="productmaster-add" onClick={onAddClick} />
      <Table
        id="catagory-table"
        header={headerProperty}
        fieldId="catagoryId"
        numberFiled="no"
        searchData={searchValue}
        searchColumn={[
          "productCode",
          "productName",
          "catagoryName",
          "supplierName"
        ]}
        data={[]}
        contextMenu={true}
        handleMenuClick={data => handleMenuClick(data)}
        width={["8%", "13%", "25%", "18%", "18%", "14%", "5%"]}
      />
      <Dialog
        open={open}
        id={dialogId}
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
          autoFocus={mode === "edit"}
          inputRef={productnameref}
          fullWidth
        />
        <MasterInput
          id="catagory-master-input"
          ref={catagoryRef}
          parentId={dialogId}
          fullWidth
          label="Catagory"
          masterId="catagory_name_master"
        />
        <MasterInput
          id="supplier-master-input"
          ref={supplierRef}
          parentId={dialogId}
          fullWidth
          label="Supplier"
          masterId="supplier_name_master"
        />
        <NumericInput
          defaultValue={mode === "add" ? "" : ""}
          id="product-mrp"
          disabled={mode === "view"}
          ref={mrpRef}
          fullWidth
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
          commaSeparate={true}
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
    productData: state.productData
  };
};

const ProductMasterData = withStyles(styles)(ProductMaster);

export default connect(mapStateToProps, mapDispatchToProps)(ProductMasterData);
