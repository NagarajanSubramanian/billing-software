import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const ConfiramtionDialog = props => {
  return (
    <Dialog
      id={props.id}
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.handleOk}
          color={props.okButtonColor ? "primary" : ""}
          autoFocus={props.okLabelFocus}
        >
          {props.okLabel}
        </Button>
        <Button
          onClick={props.handleCancel}
          color={props.cancelButtonColor ? "primary" : ""}
          autoFocus={props.cancelLabelFocus}
        >
          {props.cancelLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfiramtionDialog;