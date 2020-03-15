import React from "react";
import SearchInput from "./../../components/searchinput/searchInput";
import Fab from "./../../components/fab/Fab";
import FormDialog from "./../../components/dialog/dialog";
import Snackbar from "./../../components/snackbar/snackbar";
import TextField from "@material-ui/core/TextField";
import NumericInput from "./../../components/numericinput/numericinput";
import Table from "./../../components/table/table";
import ConfimationDialog from "./../../components/confimationdialog/confirmationDialog";
import { BACKEND_URL } from "./../../constants/constants";
import { connect } from "react-redux";
import { loadSupplier } from "./../../../src/redux/action/crackerAction";
import EmptyData from "./../../components/emptydata/emptyData";

const supplierNameRef = React.createRef();
const shortNameRef = React.createRef();
const addressRef = React.createRef();
const cityRef = React.createRef();
const pincodeRef = React.createRef();
const mobileRef = React.createRef();
const emailRef = React.createRef();
const tinRef = React.createRef();
const cstRef = React.createRef();
const panRef = React.createRef();
const Supplier = props => {
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [snackopen, setSnackOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [snackType, setSnackType] = React.useState("success");
  const [supplierId, setSupplierId] = React.useState("");
  const [mode, setMode] = React.useState("");
  const [gridSelectData, setSelectedGridData] = React.useState({});

  const [confimationTitle, setConfimationTitle] = React.useState(
    "Confirmation"
  );
  const [confirmationContent, setConfimationContent] = React.useState(
    "Do you want to add record?"
  );
  const [okLabel, setOkLabel] = React.useState("YES");
  const [cancelLabel, setCancelLabel] = React.useState("NO");
  const [okLabelFocus, setOKLabelFocus] = React.useState(true);
  const [cancelLabelFocus, setCancelLabelFocus] = React.useState(false);
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [okButtonColor, setOkButtonColor] = React.useState("primary");
  const [cancelButtonColor, setCancelButtonColor] = React.useState("primary");
  const [emptyDataHeader, setEmptyDataHeader] = React.useState("No Data Found");
  const [emptyDataDescription, setEmptyDataDescription] = React.useState(
    "Please add new Catagory"
  );

  function openAddDialog() {
    setOpen(true);
    setMode("add");
    setDialogTitle("Add Supplier");
    setSupplierId("");
  }

  function onKeyPress() {}
  function handleClose() {
    setSnackOpen(false);
  }

  function onCancelClick() {
    setOpen(false);
  }
  function handleMenuClick(data) {
    var value = props.supplierData.filter(
      value => value.supplierId === data.id
    );
    setSupplierId(data.id);
    setMode(data.menuId);
    if (value.length > 0) {
      setSelectedGridData(value[0]);
      setOpen(true);
      if (data.menuId === "view") {
        setDialogTitle("View Supplier");
      } else {
        setDialogTitle("Edit Supplier");
      }
    }
  }
  function onSaveClick() {
    if (
      supplierNameRef.current.value &&
      shortNameRef.current.value &&
      addressRef.current.value &&
      cityRef.current.value &&
      pincodeRef.current.value &&
      mobileRef.current.value &&
      emailRef.current.value &&
      tinRef.current.value &&
      cstRef.current.value
    ) {
      if (mode === "add") {
        setConfimationContent("Do you want to add supplier?");
      } else {
        setConfimationContent("Do you want to update supplier?");
      }
      setConfirmationOpen(true);
    } else {
      supplierNameRef.current.focus();
      setSnackOpen(true);
      setSnackType("error");
      setMessage("Enter all fields.");
    }
  }

  function handleConfirmationOk() {
    var currentData = {};
    if (supplierId) {
      currentData["supplierId"] = supplierId;
    }
    currentData["mode"] = mode;
    currentData["supplierName"] = supplierNameRef.current.value;
    currentData["supplierShortName"] = shortNameRef.current.value;
    currentData["supplierAddress"] = addressRef.current.value;
    currentData["supplierCity"] = cityRef.current.value;
    currentData["supplierPincode"] = pincodeRef.current.value;
    currentData["supplierPhoneno"] = mobileRef.current.value;
    currentData["supplierEmail"] = emailRef.current.value;
    currentData["supplierTin"] = tinRef.current.value;
    currentData["supplierCst"] = cstRef.current.value;
    currentData["supplierPan"] = panRef.current.value;
    currentData["searchValue"] = searchValue;
    currentData["searchField"] = [
      "supplierName",
      "supplierShortName",
      "supplierCity",
      "supplierPhoneno",
      "supplierEmail"
    ];
    fetch(BACKEND_URL + "/insertSupplier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentData)
    })
      .then(res => res.json())
      .then(
        data => {
          if (mode === "add") {
            if (data["status"] === "exist") {
              setSnackOpen(true);
              setSnackType("error");
              setMessage("Supplier Name already exists.");
            } else {
              props.loadSupplier(data["supplier"]);
              setSnackOpen(true);
              setSnackType("success");
              setMessage("Supplier added successfully.");
              setOpen(false);
              setMode(mode);
            }
          } else {
            if (data["status"] === "notexist") {
              setSnackOpen(true);
              setSnackType("error");
              setMessage("Supplier already deleted.");
            } else {
              props.loadSupplier(data["supplier"]);
              setSnackOpen(true);
              setSnackType("success");
              setMessage("Supplier updated successfully.");
              setOpen(false);
              setMode(mode);
            }
          }
          setConfirmationOpen(false);
        },
        error => {}
      );
  }

  function handleConfirmationClose() {
    setConfirmationOpen(false);
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
      field: "supplierName",
      visible: true,
      headerName: "Supplier Name",
      align: "left",
      headerAlign: "center",
      type: "string",
      commaSeparate: false
    },
    {
      field: "supplierShortName",
      visible: true,
      headerName: "Short Name",
      align: "left",
      headerAlign: "center",
      type: "string",
      commaSeparate: false
    },
    {
      field: "supplierCity",
      visible: true,
      headerName: "City",
      align: "left",
      headerAlign: "center",
      type: "string",
      commaSeparate: false
    },
    {
      field: "supplierPhoneno",
      visible: true,
      headerName: "Mobile No",
      align: "center",
      headerAlign: "center",
      type: "number",
      commaSeparate: false
    },
    {
      field: "supplierEmail",
      visible: true,
      headerName: "Email",
      align: "left",
      headerAlign: "center",
      type: "string",
      commaSeparate: false
    }
  ];

  const searchOnChange = event => {
    var valueData = event.currentTarget.value
      ? event.currentTarget.value.trim()
      : "";
    setSearchValue(valueData);
    fetch(BACKEND_URL + "/searchSupplierData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        supplierName: valueData,
        searchField: [
          "supplierName",
          "supplierShortName",
          "supplierCity",
          "supplierPhoneno",
          "supplierEmail"
        ]
      })
    })
      .then(res => res.json())
      .then(
        data => {
          if (data.length <= 0) {
            setEmptyDataDescription("Please search with some other keyword.");
          }
          props.loadSupplier(data);
        },
        error => {}
      );
  };

  return (
    <React.Fragment>
      <SearchInput placeholder="Search Supplier" onChange={searchOnChange} />
      <EmptyData
        emptyDataShow={props.supplierData.length <= 0}
        emptyDataHeader={emptyDataHeader}
        emptyDataDescription={emptyDataDescription}
      />
      <Table
        header={headerProperty}
        data={props.supplierData}
        fieldId="supplierId"
        numberFiled="no"
        id="supplier-table"
        contextMenu={true}
        searchData={searchValue}
        searchColumn={[
          "supplierName",
          "supplierShortName",
          "supplierCity",
          "supplierPhoneno",
          "supplierEmail"
        ]}
        handleMenuClick={handleMenuClick}
        width={["8%", "25%", "15%", "17%", "13%", "17%", "5%"]}
      />
      <Fab
        id="supplier-Add"
        className="newapplication-add"
        onClick={openAddDialog}
      />
      <FormDialog
        saveButton={mode !== "view"}
        open={open}
        onCancelClick={() => onCancelClick()}
        onSaveClick={data => onSaveClick(data)}
        dialogTitle="Add Supplier"
      >
        <TextField
          autoFocus={mode === "add" || mode === "edit"}
          defaultValue={mode === "add" ? "" : gridSelectData.supplierName}
          margin="dense"
          disabled={mode === "view"}
          id="supplier-name"
          label="Supplier Name"
          type="text"
          inputRef={supplierNameRef}
          fullWidth
        />

        <TextField
          margin="dense"
          defaultValue={mode === "add" ? "" : gridSelectData.supplierShortName}
          id="short-name-supplier"
          disabled={mode === "view"}
          label="Short Name"
          type="text"
          inputRef={shortNameRef}
          fullWidth
        />
        <TextField
          margin="normal"
          defaultValue={mode === "add" ? "" : gridSelectData.supplierAddress}
          id="address-supplier-code"
          disabled={mode === "view"}
          multiline
          rowsMax="4"
          label="Address"
          inputRef={addressRef}
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          defaultValue={mode === "add" ? "" : gridSelectData.supplierCity}
          disabled={mode === "view"}
          id="city-supplier"
          label="City"
          inputRef={cityRef}
          type="text"
          onKeyPress={onKeyPress}
          fullWidth
        />

        <NumericInput
          defaultValue={mode === "add" ? "" : gridSelectData.supplierPincode}
          id="supplier-pincode"
          disabled={mode === "view"}
          ref={pincodeRef}
          fullWidth
          label="Pincode"
          maxLength={6}
        />
        <NumericInput
          defaultValue={mode === "add" ? "" : gridSelectData.supplierPhoneno}
          id="supplier-mobile"
          disabled={mode === "view"}
          ref={mobileRef}
          fullWidth
          label="Mobile No"
          maxLength={10}
        />
        <TextField
          margin="dense"
          defaultValue={mode === "add" ? "" : gridSelectData.supplierEmail}
          disabled={mode === "view"}
          id="supplier-email"
          label="Email"
          type="text"
          inputRef={emailRef}
          fullWidth
        />
        <TextField
          margin="dense"
          defaultValue={mode === "add" ? "" : gridSelectData.supplierTin}
          disabled={mode === "view"}
          id="supplier-tin"
          label="TIN"
          type="text"
          inputRef={tinRef}
          fullWidth
        />
        <TextField
          margin="dense"
          defaultValue={mode === "add" ? "" : gridSelectData.supplierCst}
          disabled={mode === "view"}
          id="supplier-cst"
          label="CST"
          type="text"
          inputRef={cstRef}
          fullWidth
        />
        <TextField
          margin="dense"
          defaultValue={mode === "add" ? "" : gridSelectData.supplierPan}
          disabled={mode === "view"}
          id="supplier-pan"
          label="PAN"
          type="text"
          inputRef={panRef}
          fullWidth
        />
      </FormDialog>
      <ConfimationDialog
        id="catagory-add-confiramtion"
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
        handleClose={() => handleConfirmationClose()}
      />
      <Snackbar
        open={snackopen}
        type={snackType}
        message={message}
        handleClose={() => handleClose()}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    supplierData: state.supplierData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSupplier: supplierData => dispatch(loadSupplier(supplierData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);
