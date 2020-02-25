import React from "react";
import Fab from "./../components/fab/Fab";
import FormDialog from "./../components/dialog/dialog";
import TextField from "@material-ui/core/TextField";
import Snackbar from "./../components/snackbar/snackbar";
import SearchInput from "./../components/searchinput/searchInput";
import Table from "./../components/table/table";
import { connect } from "react-redux";
import NumericInput from "./../components/numericinput/numericinput";
import ConfimationDialog from "./../components/confimationdialog/confirmationDialog";

const Category = props => {
  const [open, setOpen] = React.useState(false);
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
    console.log(shortRef.current.value);
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
  console.log(props.catagoryData);
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

        <NumericInput
          autoFocus={mode === "edit"}
          defaultValue={mode === "add" ? "" : gridSelectData.name}
          id="catagory-short"
          disabled={mode === "view"}
          ref={shortRef}
          fullWidth
          label="Short"
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

        <NumericInput
          defaultValue={mode === "add" ? "" : gridSelectData.name}
          id="catagory-cst"
          disabled={mode === "view"}
          ref={cstRef}
          fullWidth
          label="CST"
          precision={2}
        />

        <NumericInput
          defaultValue={mode === "add" ? "" : gridSelectData.name}
          id="catagory-vat"
          disabled={mode === "view"}
          ref={vatRef}
          fullWidth
          label="VAT"
          precision={2}
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
      />
      <Snackbar
        open={snackopen}
        type={snackType}
        message={message}
        handleClose={() => handleClose()}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    catagoryData: state.catagoryData
  };
};

export default connect(mapStateToProps)(Category);
