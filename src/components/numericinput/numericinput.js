import React from "react";
import TextField from "@material-ui/core/TextField";

const NumericField = React.forwardRef((props, ref) => {
  const refs = ref;
  var valueData = props.defaultValue ? props.defaultValue.toString() : "";
  if (valueData && props.commaSeparate) {
    valueData = parseFloat(valueData).toLocaleString("en-IN");
  }

  function handleKeyPress(event) {
    var value = ref.current.value.replace(/,/g, "");
    if (props.precision) {
      if (!isNaN(event.key) || event.key === ".") {
        if (
          (event.key === "." && value.indexOf(".") > 0) ||
          (event.key !== "." && isNaN(event.key))
        ) {
          event.preventDefault();
        }
        if (props.maxLength && value) {
          var mainValue = value.split(".")[0];
          if (!(mainValue.length < props.maxLength)) {
            event.preventDefault();
          }
        }
      } else {
        event.preventDefault();
      }
    } else {
      if (!(!isNaN(event.key) && value.length < props.maxLength)) {
        event.preventDefault();
      }
    }
  }

  const handleFocusOut = event => {
    if (props.commaSeparate && refs.current.value) {
      var value = refs.current.value.replace(/,/g, "");
      value = parseFloat(value).toLocaleString("en-IN");
      refs.current.value = value;
      if (props.precision && value.indexOf(".") < 0) {
        refs.current.value = value + "." + "0";
      }
    }
    if (!refs.current.value) {
      refs.current.value = "";
    }
  };
  return (
    <React.Fragment>
      <TextField
        inputRef={ref}
        autoFocus={props.autoFocus}
        defaultValue={valueData}
        id={props.id}
        disabled={props.disabled}
        fullWidth={props.fullWidth}
        style={props.style}
        label={props.label}
        onKeyPress={handleKeyPress}
        onBlur={handleFocusOut}
        inputProps={{
          style: { textAlign: "right", padding: "6px 6px" }
        }}
      />
    </React.Fragment>
  );
});
export default NumericField;
