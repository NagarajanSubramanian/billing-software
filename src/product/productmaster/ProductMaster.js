import React from "react";
import Fab from "./../../components/fab/Fab";
import Dialog from "./../../components/dialog/dialog";
import TextField from "@material-ui/core/TextField";
import SnackBar from "./../../components/snackbar/snackbar";
import Table from "./../../components/table/table";
import { withStyles } from "@material-ui/styles";
import SearchInput from "./../../components/searchinput/searchInput";
import axios from "axios";

const styles = {
  root: {
    width: "60%",
    margin: "auto"
  }
};

const ProductMaster = props => {
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [messageContent, setMessageContent] = React.useState("");
  const [type, setType] = React.useState("");

  const productcoderef = React.createRef();
  const productnameref = React.createRef();
  const brandref = React.createRef();
  const crackertyperef = React.createRef();
  const amountref = React.createRef();

  const { classes } = props;

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
      brandref.current.value &&
      amountref.current.value
    ) {
      const newTodo = {
        product_code: productcoderef.current.value,
        product_name: productnameref.current.value,
        brand: brandref.current.value,
        cracker_type: "ground",
        amount: amountref.current.value
      };

      axios
        .post("http://localhost:4000/products/add", newTodo)
        .then(res => console.log("res.data" + "Data added Success"));

      setMessageContent("Data Added Successfully");
      setType("success");
      setOpen(false);
    } else {
      setMessageContent("Please Enter All the Fields");
      setType("error");
    }

    setOpenSnack(true);
  };

  return (
    <div>
      <SearchInput placeholder="Search Product Name, Brand, Cracker Type" />
      <Table header={headerData} data={data} className={classes.root} />
      <Fab id="productmaster-add" onClick={onAddClick} />
      <Dialog
        open={open}
        onCancelClick={onCancelClick}
        onSaveClick={onSaveClick}
        dialogTitle="Add New Product"
        saveButton
      >
        <TextField
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
        <TextField label="Brand" type="text" inputRef={brandref} fullWidth />
        <TextField
          label="Cracker Type"
          inputRef={crackertyperef}
          select
          type="text"
          fullWidth
        >
          {["Ground Type", "Sky Type"].map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </TextField>
        <TextField label="Amount" inputRef={amountref} type="text" fullWidth />
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

export default withStyles(styles)(ProductMaster);
