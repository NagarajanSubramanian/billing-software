import React from "react";
import Fab from "./../../components/fab/Fab";
import Dialog from "./../../components/dialog/dialog";
import TextField from "@material-ui/core/TextField";
import SnackBar from "./../../components/snackbar/snackbar";

const ProductMaster = () => {
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [messageContent, setMessageContent] = React.useState("");
  const [type, setType] = React.useState("");

  const productcoderef = React.createRef();
  const productnameref = React.createRef();
  const brandref = React.createRef();
  const crackertyperef = React.createRef();
  const amountref = React.createRef();

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
      <Fab id="productmaster-add" onClick={onAddClick} />
      <Dialog
        open={open}
        onCancelClick={onCancelClick}
        onSaveClick={onSaveClick}
        dialogTitle="Add New Product"
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

export default ProductMaster;
