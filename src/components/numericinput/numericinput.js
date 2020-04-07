import React from "react";
import "./numericinput.css";

const NumericField = React.forwardRef((props, ref) => {
  const refs = ref;
  var valueData = props.defaultValue ? props.defaultValue.toString() : "";
  if (valueData && props.commaSeparate) {
    valueData = parseFloat(valueData).toLocaleString("en-IN");
  }

  React.useEffect(() => {
    if (props.autoFocus) {
      ref.current.focus();
    }
  });

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

  const handleFocusOut = (event) => {
    if (props.commaSeparate && ref.current.value) {
      var value = ref.current.value.replace(/,/g, "");
      value = parseFloat(value).toLocaleString("en-IN");
      ref.current.value = value;
      if (props.precision && value.indexOf(".") < 0) {
        refs.current.value = value + "." + "0";
      }
    }
    if (!ref.current.value) {
      ref.current.value = "";
    }
    if (props.onFocusOut) {
      props.onFocusOut();
    }
    if (props.required) {
      if (!ref.current.value) {
        ref.current.classList.add("invalid");
      } else {
        ref.current.classList.remove("invalid");
      }
    }
  };
  const onFocus = function () {
    if (ref.current) {
      var value = ref.current.value.replace(/,/g, "");
      if (!isNaN(value)) {
        ref.current.value = value;
      }
    }
    if (props.onFocus) {
      props.onFocus();
    }
  };
  var className = props.required && !props.disabled ? "required " : "";
  var inputClassName = props.disabled ? "input-disabled " : "";
  inputClassName =
    inputClassName + "text-input-class text-input-size-m numeric-input";
  className = className + " text-label";

  const showLabel = function () {
    console.log(props.label);
    if (props.label) {
      return (
        <label className={className} title={props.label}>
          {props.label}
        </label>
      );
    }
  };
  const onkeydown = function (event) {
    if (props.onkeydown) {
      props.onkeydown(event);
    }
  };
  return (
    <React.Fragment>
      <div style={props.style} id={props.id} className="text-field-m">
        {showLabel()}
        <div className="text-input-div">
          <input
            ref={ref}
            id={props.id + "_target"}
            disabled={props.disabled}
            defaultValue={props.defaultValue}
            autoFocus={props.autoFocus}
            className={inputClassName}
            onKeyPress={handleKeyPress}
            onBlur={handleFocusOut}
            onFocus={onFocus}
            onKeyDown={onkeydown}
          />
        </div>
      </div>
    </React.Fragment>
  );
});
export default NumericField;
