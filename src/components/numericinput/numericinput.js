import React from "react";
import TextField from "@material-ui/core/TextField";

const NumericField = React.forwardRef((props, ref) => {
  const [value, setValue] = React.useState("");

  function handleInputChange(event, props) {
    var getValue = event.target.value.replace(/,/g, "");
    if (!getValue) {
      setValue("");
      return;
    }
    if (props.precision) {
      if (
        !isNaN(parseFloat(getValue)) ||
        (getValue.indexOf(".") >= 0 && getValue.split(".").length === 2)
      ) {
        var valueData = parseFloat(
          parseFloat(getValue).toFixed(props.precision)
        ).toLocaleString("en-IN");
        if (getValue.indexOf(".") >= 0) {
          valueData = (getValue + "").split(".")[1]
            ? valueData
            : valueData + ".";
        }
        setValue(valueData);
      }
    } else {
      if (getValue.indexOf(".") < 0) {
        if (!isNaN(getValue)) {
          if (props.maxLength) {
            if (getValue.length <= props.maxLength) {
              props.showSeparator
                ? setValue(parseInt(getValue).toLocaleString("en-IN"))
                : setValue(event.target.value);
            }
          } else {
            props.showSeparator
              ? setValue(parseInt(getValue).toLocaleString("en-IN"))
              : setValue(event.target.value);
          }
        }
      }
    }
  }
  return (
    <React.Fragment>
      <TextField
        value={value}
        inputRef={ref}
        autoFocus={props.autoFocus}
        defaultValue={props.defaultValue}
        id={props.id}
        disabled={props.disabled}
        fullWidth={props.fullWidth}
        label={props.label}
        defaultValue={props.defaultValue ? props.defaultValue : ""}
        onChange={event => handleInputChange(event, props)}
        inputProps={{ style: { textAlign: "right", padding: "6px 6px" } }}
      />
    </React.Fragment>
  );
});
export default NumericField;
