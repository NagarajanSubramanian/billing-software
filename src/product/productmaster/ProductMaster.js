import React from "react";
import Fab from "./../../components/fab/Fab";
import Dialog from "./../../components/dialog/dialog";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";

const ProductMaster = () => {
  const [open, setOpen] = React.useState(false);

  const onAddClick = () => {
    setOpen(true);
  };

  const onCancelClick = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab id="productmaster-add" onClick={onAddClick} />
      <Dialog
        open={open}
        onCancelClick={onCancelClick}
        dialogTitle="Add New Product"
      >
        <TextField label="Product Code" type="text" fullWidth />
        <TextField label="Product Name" type="text" fullWidth />
        <TextField label="Brand" type="text" fullWidth />
        <TextField label="Cracker Type" select type="text" fullWidth>
          {["Ground Type", "Sky Type"].map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </TextField>
        <TextField label="Amount" type="text" fullWidth />
      </Dialog>
    </div>
  );
};

export default ProductMaster;
