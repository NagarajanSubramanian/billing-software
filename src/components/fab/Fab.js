import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./Fab.css";

const FabButton = props => {
  return (
    <Fab
      style={{
        position: "absolute",
        right: "50px",
        bottom: "40px"
      }}
      className="newapplication"
      color="primary"
      variant="round"
      id={props.id}
      onClick={props.onClick}
    >
      <AddIcon />
    </Fab>
  );
};

export default FabButton;
