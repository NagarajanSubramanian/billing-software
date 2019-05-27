import React from "react";
import FormDialog from "../../components/dialog/Dialog";
import Fab from "./../../components/fab/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./CustomerMaster.css";

const customerdetails = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  const onAddClick = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Fab id="customermaster-add" onClick={onAddClick} />
      <FormDialog
        open={open}
        onCancelClick={() => props.onCancelClick()}
        onSaveClick={data => props.onSaveClick(data)}
      >
        Add New Customer{" "}
      </FormDialog>
    </React.Fragment>
  );
});

export default customerdetails;
