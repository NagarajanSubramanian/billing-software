import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { APP_BAR_COLOR } from "./../../constants/constants";

const backgroundColor = APP_BAR_COLOR;

const styleData = makeStyles(theme => ({
  dialogTitle: {
    backgroundColor: backgroundColor,
    color: "white",
    padding: "8px 24px"
  }
}));

const buttonRef = React.createRef();

const FormDialog = React.forwardRef((props, ref) => {
  const style = styleData();
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
        <DialogTitle
          classes={{ root: style.dialogTitle }}
          id="form-dialog-title"
        >
          {props.dialogTitle}
        </DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          <Button
            buttonRef={ref}
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
});

export default FormDialog;
