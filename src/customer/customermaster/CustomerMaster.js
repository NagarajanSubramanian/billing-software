import React from "react";
import FormDialog from "../../components/dialog/Dialog";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./CustomerMaster.css";

const customerdetails = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  const onAddClick = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Fab
        id="add-new-button"
        variant="round"
        color="primary"
        onClick={onAddClick}
      >
        <AddIcon />
      </Fab>
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
