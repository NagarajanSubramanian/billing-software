import React from "react";
import Fab from "./../components/fab/Fab";
import FormDialog from "./../components/dialog/dialog";
import TextField from "@material-ui/core/TextField";
import Snackbar from "./../components/snackbar/snackbar";
import SearchInput from "./../components/searchinput/searchInput";
import Table from "./../components/table/table";
import { combineReducers } from "redux";

export default function Category(props) {
  const [open, setOpen] = React.useState(false);
  const [snackopen, setSnackOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [snackType, setSnackType] = React.useState("success");
  const [gridData, setGridData] = React.useState([]);
  const [mode, setMode] = React.useState("");
  const [gridSelectData, setSelectedGridData] = React.useState({});
  const catagoryNameRef = React.createRef();
  const shortRef = React.createRef();
  const commodityRef = React.createRef();
  const cstRef = React.createRef();
  const vatRef = React.createRef();

  const { classes } = props;
  function onCancelClick() {
    setOpen(false);
  }

  function onSaveClick(data) {
    console.log(catagoryNameRef.current.value);
    if (
      catagoryNameRef.current.value &&
      shortRef.current.value &&
      commodityRef.current.value &&
      cstRef.current.value &&
      vatRef.current.value
    ) {
      setOpen(false);
      setSnackOpen(true);
      setSnackType("success");
      setMessage("Saved successfully.");
    } else {
      setSnackOpen(true);
      setSnackType("error");
      setMessage("Enter all fields.");
    }
  }

  function onKeyPress() {}
  function handleClose() {
    setSnackOpen(false);
  }
  function openAddDialog() {
    setOpen(true);
    setMode("add");
  }
  function handleMenuClick() {}
  return (
    <div>
      <SearchInput placeholder="Search Catagory Name, Commodity code" />
      <Table
        header={[
          "No",
          "Catagory Name",
          "Short",
          "Commodity-code",
          "CST",
          "VST",
          ""
        ]}
        data={[]}
        handleMenuClick={handleMenuClick}
        width={["8%", "27%", "15%", "15%", "15%", "15%", "5%"]}
      />
      <Fab
        id="category-Add"
        className="newapplication-add"
        onClick={openAddDialog}
      />
      <FormDialog
        saveButton={mode !== "view"}
        open={open}
        onCancelClick={() => onCancelClick()}
        onSaveClick={data => onSaveClick(data)}
        dialogTitle="Add Catagory"
      >
        <TextField
          autoFocus={mode === "add"}
          defaultValue={mode === "add" ? "" : gridSelectData.id}
          margin="dense"
          disabled={mode === "edit" || mode === "view"}
          id="catagory-name"
          label="Catagory Name"
          type="text"
          inputRef={catagoryNameRef}
          fullWidth
        />

        <TextField
          margin="dense"
          autoFocus={mode === "edit"}
          defaultValue={mode === "add" ? "" : gridSelectData.name}
          id="catagory-short"
          disabled={mode === "view"}
          label="Short"
          type="text"
          inputRef={shortRef}
          fullWidth
        />
        <TextField
          margin="normal"
          defaultValue={mode === "add" ? "" : gridSelectData.address}
          id="catagory-commodity-code"
          disabled={mode === "view"}
          multiline
          rowsMax="4"
          label="Commodity Code"
          inputRef={commodityRef}
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          defaultValue={mode === "add" ? "" : gridSelectData.phoneNo}
          disabled={mode === "view"}
          id="catagory-cst"
          label="CST"
          inputRef={cstRef}
          type="text"
          onKeyPress={onKeyPress}
          fullWidth
        />
        <TextField
          margin="dense"
          defaultValue={mode === "add" ? "" : gridSelectData.email}
          disabled={mode === "view"}
          id="catagory-vat"
          label="VAT"
          type="text"
          inputRef={vatRef}
          fullWidth
        />
      </FormDialog>
      <Snackbar
        open={snackopen}
        type={snackType}
        message={message}
        handleClose={() => handleClose()}
      />
    </div>
  );
}
