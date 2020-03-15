import React from "react";
import ReactDOM from "react-dom";
import Fab from "./../../components/fab/Fab";
import FormDialog from "./../../components/dialog/dialog";
import TextField from "@material-ui/core/TextField";
import Snackbar from "./../../components/snackbar/snackbar";
import SearchInput from "./../../components/searchinput/searchInput";
import EmptyData from "./../../components/emptydata/emptyData";
import Table from "./../../components/table/table";
import { connect } from "react-redux";
import NumericInput from "./../../components/numericinput/numericinput";
import ConfimationDialog from "./../../components/confimationdialog/confirmationDialog";
import { BACKEND_URL } from "./../../constants/constants";
import { loadCatagory } from "./../../../src/redux/action/crackerAction";

const catagoryNameRef = React.createRef();
const shortRef = React.createRef();
const commodityRef = React.createRef();
const cstRef = React.createRef();
const vatRef = React.createRef();

const cancelButtonRef = React.createRef();
const Category = props => {
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [catagoryId, setCatagoryId] = React.useState("");
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
  const [snackopen, setSnackOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [snackType, setSnackType] = React.useState("success");
  const [currentData, setCurrentData] = React.useState({});
  const [mode, setMode] = React.useState("");
  const [gridSelectData, setSelectedGridData] = React.useState({});
  const [emptyDataHeader, setEmptyDataHeader] = React.useState("No Data Found");
  const [emptyDataDescription, setEmptyDataDescription] = React.useState(
    "Please add new Catagory"
  );

  function onCancelClick() {
    setOpen(false);
  }

  function onSaveClick(data) {
    if (
      catagoryNameRef.current.value &&
      shortRef.current.value &&
      commodityRef.current.value &&
      cstRef.current.value &&
      vatRef.current.value
    ) {
      setCurrentData({
        catagoryName: catagoryNameRef.current.value,
        catagoryShort: shortRef.current.value.replace(/,/g, ""),
        catagoryCommodityCode: commodityRef.current.value,
        catagoryCst: cstRef.current.value.replace(/,/g, ""),
        catagoryVat: vatRef.current.value.replace(/,/g, "")
      });
      if (mode === "add") {
        setConfimationContent("Do you want to add catagory?");
      } else {
        setConfimationContent("Do you want to update catagory?");
      }
      setConfirmationOpen(true);
    } else {
      catagoryNameRef.current.focus();
      setSnackOpen(true);
      setSnackType("error");
      setMessage("Enter all fields.");
    }
  }

  function handleClose() {
    setSnackOpen(false);
  }
  function openAddDialog() {
    setCatagoryId("");
    setDialogTitle("Add Catagory");
    setOpen(true);
    setMode("add");
  }
  function handleConfirmationOk() {
    if (catagoryId) {
      currentData["catagoryId"] = catagoryId;
    }
    currentData["mode"] = mode;
    currentData["searchValue"] = searchValue;
    currentData["searchField"] = [
      "catagoryName",
      "catagoryShort",
      "catagoryCommodityCode"
    ];
    fetch(BACKEND_URL + "/insertCatagory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentData)
    })
      .then(res => res.json())
      .then(
        data => {
          if (mode === "add") {
            if (data["status"] === "exist") {
              catagoryNameRef.current.focus();
              setSnackOpen(true);
              setSnackType("error");
              setMessage("Catagory Name already exists.");
            } else {
              setSnackOpen(true);
              setSnackType("success");
              props.loadCatagory(data["catagory"]);
              setMessage("Catagory added successfully.");
              setOpen(false);
              setMode(mode);
            }
          } else {
            if (data["status"] === "notexist") {
              catagoryNameRef.current.focus();
              setSnackOpen(true);
              setSnackType("error");
              setMessage("Catagory already deleted.");
            } else {
              setSnackOpen(true);
              setSnackType("success");
              props.loadCatagory(data["catagory"]);
              setMessage("Catagory updated successfully.");
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
    catagoryNameRef.current.focus();
    setConfirmationOpen(false);
  }
  const handleMenuClick = data => {
    var value = props.catagoryData.filter(
      value => value.catagoryId === data.id
    );
    console.log(ReactDOM.findDOMNode(cancelButtonRef.current));
    setCatagoryId(data.id);
    if (value.length > 0) {
      if (data.menuId === "view") {
        setDialogTitle("View Catagory");
        setTimeout(() => {
          ReactDOM.findDOMNode(cancelButtonRef.current).focus();
          cancelButtonRef.current.className =
            cancelButtonRef.current.className + " Mui-focusVisible";
          cancelButtonRef.current.focus();
        }, 1000);
      } else {
        setDialogTitle("Edit Catagory");
      }
      setSelectedGridData(value[0]);
      setCurrentData(value[0]);
      setMode(data.menuId);
      setOpen(true);
    }
  };

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
      field: "catagoryName",
      visible: true,
      headerName: "Catagory Name",
      align: "left",
      headerAlign: "center",
      type: "string",
      commaSeparate: false
    },
    {
      field: "catagoryShort",
      visible: true,
      headerName: "Short",
      align: "center",
      headerAlign: "center",
      type: "number",
      commaSeparate: true
    },
    {
      field: "catagoryCommodityCode",
      visible: true,
      headerName: "Commodity Code",
      align: "left",
      headerAlign: "center",
      type: "string",
      commaSeparate: false
    },
    {
      field: "catagoryCst",
      visible: true,
      headerName: "CST",
      align: "center",
      headerAlign: "center",
      type: "number",
      commaSeparate: true
    },
    {
      field: "catagoryVat",
      visible: true,
      headerName: "VAT",
      align: "center",
      headerAlign: "center",
      type: "number",
      commaSeparate: true
    }
  ];

  const searchOnChange = event => {
    var searchData = event.currentTarget.value
      ? event.currentTarget.value.trim()
      : "";
    setSearchValue(searchData);
    fetch(BACKEND_URL + "/searchCatgoryData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        catagoryName: searchData,
        searchField: ["catagoryName", "catagoryShort", "catagoryCommodityCode"]
      })
    })
      .then(res => res.json())
      .then(
        data => {
          if (data.length <= 0) {
            setEmptyDataDescription("Please search with some other keyword.");
          }
          props.loadCatagory(data);
        },
        error => {}
      );
  };
  return (
    <div>
      <SearchInput
        placeholder="Search Catagory Name, Catagory Short, Commodity code"
        onChange={searchOnChange}
      />
      <EmptyData
        emptyDataShow={props.catagoryData.length <= 0}
        emptyDataHeader={emptyDataHeader}
        emptyDataDescription={emptyDataDescription}
      />
      <Table
        id="catagory-table"
        header={headerProperty}
        fieldId="catagoryId"
        numberFiled="no"
        searchData={searchValue}
        searchColumn={[
          "catagoryName",
          "catagoryShort",
          "catagoryCommodityCode"
        ]}
        data={props.catagoryData}
        contextMenu={true}
        handleMenuClick={handleMenuClick}
        width={["8%", "27%", "15%", "15%", "15%", "15%", "5%"]}
      />
      <Fab
        id="category-Add"
        className="newapplication-add"
        onClick={openAddDialog}
      />
      <FormDialog
        ref={cancelButtonRef}
        saveButton={mode !== "view"}
        open={open}
        onCancelClick={() => onCancelClick()}
        onSaveClick={data => onSaveClick(data)}
        dialogTitle={dialogTitle}
      >
        <TextField
          autoFocus={mode === "add" || mode === "edit"}
          defaultValue={mode === "add" ? "" : gridSelectData.catagoryName}
          margin="dense"
          disabled={mode === "view"}
          id="catagory-name"
          label="Catagory Name"
          type="text"
          inputRef={catagoryNameRef}
          fullWidth
        />

        <NumericInput
          defaultValue={
            mode === "add"
              ? ""
              : parseFloat(gridSelectData.catagoryShort).toLocaleString("en-IN")
          }
          id="catagory-short"
          disabled={mode === "view"}
          ref={shortRef}
          fullWidth
          label="Short"
          maxLength={5}
          commaSeparate={true}
        />
        <TextField
          margin="normal"
          defaultValue={
            mode === "add" ? "" : gridSelectData.catagoryCommodityCode
          }
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
          defaultValue={
            mode === "add"
              ? ""
              : parseFloat(gridSelectData.catagoryCst).toLocaleString("en-IN")
          }
          id="catagory-cst"
          disabled={mode === "view"}
          ref={cstRef}
          fullWidth
          commaSeparate={true}
          label="CST"
          precision={2}
        />

        <NumericInput
          defaultValue={
            mode === "add"
              ? ""
              : parseFloat(gridSelectData.catagoryVat).toLocaleString("en-IN")
          }
          id="catagory-vat"
          disabled={mode === "view"}
          ref={vatRef}
          fullWidth
          label="VAT"
          commaSeparate={true}
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
        handleOk={handleConfirmationOk}
        handleClose={handleConfirmationClose}
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

const mapDispatchToProps = dispatch => {
  return {
    loadCatagory: catagoryData => dispatch(loadCatagory(catagoryData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
