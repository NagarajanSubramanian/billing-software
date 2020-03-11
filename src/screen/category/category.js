import React from "react";
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
  const [gridData, setGridData] = React.useState([]);
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
      setConfirmationOpen(true);
    } else {
      setSnackOpen(true);
      setSnackType("error");
      setMessage("Enter all fields.");
      setTimeout(() => catagoryNameRef.current.focus(), 100);
    }
  }

  function handleClose() {
    setSnackOpen(false);
  }
  function openAddDialog() {
    setCatagoryId("");
    setOpen(true);
    setMode("add");
  }
  function handleConfirmationOk() {
    if (catagoryId) {
      currentData["catagoryId"] = catagoryId;
    }
    currentData["mode"] = mode;
    fetch(BACKEND_URL + "/insertCatagory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentData)
    })
      .then(res => res.text())
      .then(
        data => {
          if (data === "exist") {
            setSnackOpen(true);
            setSnackType("error");
            setMessage("Catagory Name already exists.");
            setTimeout(() => catagoryNameRef.current.focus(), 100);
          } else {
            setSnackOpen(true);
            setSnackType("success");
            setMessage("Saved successfully.");
            setOpen(false);
            setMode(mode);
          }
          setConfirmationOpen(false);
        },
        error => {}
      );
  }
  function handleConfirmationClose() {
    setConfirmationOpen(false);
    catagoryNameRef.current.focus();
  }
  const handleMenuClick = data => {
    var value = props.catagoryData.filter(
      value => value.catagoryId === data.id
    );
    setCatagoryId(data.id);
    if (value.length > 0) {
      setSelectedGridData(value[0]);
      setCurrentData(value[0]);
      setOpen(true);
      setMode(data.menuId);
      if (data.menuId === "view") {
        setTimeout(() => cancelButtonRef.current.focus(), 100);
      }
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
    setSearchValue(event.currentTarget.value);
    fetch(BACKEND_URL + "/searchCatgoryData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ catagoryName: event.currentTarget.value })
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
        placeholder="Search Catagory Name, Catagory Short,Commodity code"
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
        handleMenuClick={data => handleMenuClick(data)}
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
        dialogTitle="Add Catagory"
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
          maxLength={5}
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
