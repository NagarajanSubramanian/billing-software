import React from "react";
import SearchInput from "./../../components/searchinput/searchInput";
import Fab from "./../../components/fab/Fab";
import FormDialog from "./../../components/dialog/dialog";
import Snackbar from "./../../components/snackbar/snackbar";
import TextField from "@material-ui/core/TextField";
import NumericInput from "./../../components/numericinput/numericinput";
import Table from "./../../components/table/table";

export default function Supplier() {
  const [open, setOpen] = React.useState(false);
  const [snackopen, setSnackOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [snackType, setSnackType] = React.useState("success");
  const [gridData, setGridData] = React.useState([]);
  const [mode, setMode] = React.useState("");
  const [gridSelectData, setSelectedGridData] = React.useState({});

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

  function openAddDialog() {
    setOpen(true);
    setMode("add");
  }

  function onKeyPress() {}
  function handleClose() {
    setSnackOpen(false);
  }

  function onCancelClick() {
    setOpen(false);
  }
  function handleMenuClick() {}
  function onSaveClick() {}

  return (
    <React.Fragment>
      <SearchInput placeholder="Search Supplier" />
      <Table
        header={["Supplier Name", "Short Name", "Phone", "Email", ""]}
        data={[]}
        handleMenuClick={handleMenuClick}
        width={["25", "20%", "25%", "25%", "5%"]}
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
          autoFocus={mode === "add"}
          defaultValue={mode === "add" ? "" : gridSelectData.id}
          margin="dense"
          disabled={mode === "edit" || mode === "view"}
          id="supplier-name"
          label="Supplier Name"
          type="text"
          inputRef={supplierNameRef}
          fullWidth
        />

        <TextField
          margin="dense"
          autoFocus={mode === "edit"}
          defaultValue={mode === "add" ? "" : gridSelectData.name}
          id="short-name-supplier"
          disabled={mode === "view"}
          label="Short Name"
          type="text"
          inputRef={shortNameRef}
          fullWidth
        />
        <TextField
          margin="normal"
          defaultValue={mode === "add" ? "" : gridSelectData.address}
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
          defaultValue={mode === "add" ? "" : gridSelectData.phoneNo}
          disabled={mode === "view"}
          id="city-supplier"
          label="City"
          inputRef={cityRef}
          type="text"
          onKeyPress={onKeyPress}
          fullWidth
        />

        <NumericInput
          autoFocus={mode === "edit"}
          defaultValue={mode === "add" ? "" : gridSelectData.name}
          id="supplier-pincode"
          disabled={mode === "view"}
          ref={pincodeRef}
          fullWidth
          label="Pincode"
          maxLength={6}
        />
        <NumericInput
          autoFocus={mode === "edit"}
          defaultValue={mode === "add" ? "" : gridSelectData.name}
          id="supplier-mobile"
          disabled={mode === "view"}
          ref={mobileRef}
          fullWidth
          label="Mobile No"
          maxLength={10}
        />
        <TextField
          margin="dense"
          defaultValue={mode === "add" ? "" : gridSelectData.email}
          disabled={mode === "view"}
          id="supplier-email"
          label="Email"
          type="text"
          inputRef={emailRef}
          fullWidth
        />
        <TextField
          margin="dense"
          defaultValue={mode === "add" ? "" : gridSelectData.email}
          disabled={mode === "view"}
          id="supplier-tin"
          label="TIN"
          type="text"
          inputRef={tinRef}
          fullWidth
        />
        <TextField
          margin="dense"
          defaultValue={mode === "add" ? "" : gridSelectData.email}
          disabled={mode === "view"}
          id="supplier-cst"
          label="CST"
          type="text"
          inputRef={cstRef}
          fullWidth
        />
        <TextField
          margin="dense"
          defaultValue={mode === "add" ? "" : gridSelectData.email}
          disabled={mode === "view"}
          id="supplier-pan"
          label="PAN"
          type="text"
          inputRef={panRef}
          fullWidth
        />
      </FormDialog>
      <Snackbar
        open={snackopen}
        type={snackType}
        message={message}
        handleClose={() => handleClose()}
      />
    </React.Fragment>
  );
}
