import React from "react";
import "./textfield.css";
import Popover from "./../popover/popover";

const TextField = React.forwardRef((props, ref) => {
  var className = props.required && !props.disabled ? "required " : "";
  var inputClassName = props.disabled ? "input-disabled " : "";
  inputClassName = inputClassName + "text-input-class text-input-size-m";
  className = className + " text-label";
  const onFocusout = function () {
    if (props.required) {
      if (!ref.current.value) {
        ref.current.classList.add("invalid");
      } else {
        ref.current.classList.remove("invalid");
      }
    }
    if (props.onFocusOut) {
      props.onFocusOut();
    }
  };

  const onFocus = function (event) {
    if (props.onFocus) {
      props.onFocus(event);
    }
  };

  const onChange = function (event) {
    if (props.onChange) {
      props.onChange(event);
    }
  };

  const onKeyDown = function (event) {
    if (props.onKeyDown) {
      props.onKeyDown(event);
    }
  };
  const onKeyUp = function (event) {
    if (props.onKeyUp) {
      props.onKeyUp(event);
    }
  };
  return (
    <div style={props.style} id={props.id} className="text-field-m text-field">
      <label
        className={props.label ? className : className + " component-none"}
        title={props.label}
      >
        {props.label}
      </label>
      <div className="text-input-div">
        <input
          ref={ref}
          autoComplete="off"
          id={props.id + "_target"}
          disabled={props.disabled}
          defaultValue={props.defaultValue}
          style={{ width: props.length + "px" }}
          autoFocus={props.autoFocus}
          className={inputClassName}
          onBlur={onFocusout}
          onFocus={onFocus}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
        />
      </div>
    </div>
  );
});

export default TextField;
