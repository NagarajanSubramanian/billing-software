import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const FormDialog = props => {
  const checkSaveButton = () => {
    if (props.saveButton) {
      return (
        <Button onClick={props.onSaveClick} color="primary">
          Save
        </Button>
      );
    }
  };

  return (
    <div style={{ marginLeft: 50 }}>
      <Dialog open={props.open}>
        <DialogTitle id="form-dialog-title">{props.dialogTitle}</DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          <Button
            autoFocus={!props.saveButton}
            onClick={props.onCancelClick}
            color="primary"
          >
            Cancel
          </Button>
          {checkSaveButton()}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
