import React from "react";
import Snack from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const style = {
  error: {
    backgroundColor: "red"
  },
  information: {
    backgroundColor: "#1976d2"
  },
  success: {
    backgroundColor: "black"
  }
};

const Snackbar = props => {
  const { classes, type } = props;
  return (
    <React.Fragment>
      <Snack
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={props.open}
        autoHideDuration={3000}
        onClose={props.handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
      >
        <SnackbarContent
          aria-describedby="client-snackbar"
          className={clsx(
            { [classes.error]: type === "error" },
            { [classes.information]: type === "information" },
            { [classes.success]: type === "success" }
          )}
          message={<span id="message-id">{props.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={props.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Snack>
    </React.Fragment>
  );
};

export default withStyles(style)(Snackbar);
