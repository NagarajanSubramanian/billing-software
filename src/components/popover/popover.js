import React from "react";
import "./popover.css";

const Popover = React.forwardRef((props, ref) => {
  var arrowPosition = "arrow-" + (props.position ? props.position : "left");
  return (
    <div id={props.id}>
      <div className={arrowPosition}></div>
      <div>
        <div>This item is required</div>
      </div>
    </div>
  );
});

export default Popover;
