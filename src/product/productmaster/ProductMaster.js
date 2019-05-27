import React from "react";
import Fab from "./../../components/fab/Fab";
import Dialog from "./../../components/dialog/Dialog";

const ProductMaster = () => {
  const [open, setOpen] = React.useState(false);

  const onAddClick = () => {
    setOpen(true);
  };
  return (
    <div>
      <Fab id="productmaster-add" onClick={onAddClick} />
      <Dialog open={open}>Add a New Product</Dialog>
    </div>
  );
};

export default ProductMaster;
