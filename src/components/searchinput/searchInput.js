import React from "react";
import "./searchinput.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const SearchInput = React.forwardRef((props, refs) => {
  var searchRef = React.createRef();
  var closeRef = React.createRef();
  var ref = refs ? refs : React.createRef();
  var className = props.required && !props.disabled ? "required " : "";
  var inputClassName = props.disabled ? "input-disabled " : "";
  inputClassName =
    inputClassName + "search-text-input-class search-text-input-size-m";
  className = className + " search-text-label";
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

  React.useEffect(() => {
    var search = searchRef.current;
    var close = closeRef.current;
    var input = ref.current.getBoundingClientRect();
    search.style.position = "absolute";
    search.style.top = input.y + 6 + "px";
    search.style.left = input.x + 8 + "px";
    search.style.color = "var(--app-bar-color)";
    search.style.fontSize = "1.35rem";

    close.style.position = "absolute";
    close.style.top = input.y + 6 + "px";
    close.style.left = input.x + input.width - 28 + "px";
    close.style.color = "black";
    close.style.fontSize = "1.35rem";
    close.style.fontSize = "block";

    console.log(searchRef);
  });

  const onFocus = function (event) {
    if (props.onFocus) {
      props.onFocus(event);
    }
  };

  const onChange = function (event) {
    if (props.onChange) {
      props.onChange(event);
    }
    var close = closeRef.current;
    if (ref.current.value) {
      close.style.display = "block";
    } else {
      close.style.display = "none";
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

  const closeIconClick = function () {
    ref.current.focus();
    var close = closeRef.current;
    close.style.display = "none";
    ref.current.value = "";
    if (props.onChange) {
      var event = { currentTarget: ref.current };
      props.onChange(event);
    }
  };
  return (
    <div className="search-text-field-m text-field">
      <label
        className={props.label ? "" : "component-none"}
        title={props.label}
      >
        {props.label}
      </label>
      <div className="search-text-input-div" id={props.id}>
        <input
          placeholder={props.placeholder}
          ref={ref}
          autoComplete="off"
          id={props.id + "_target"}
          disabled={props.disabled}
          style={{ width: props.length + "px" }}
          defaultValue={props.defaultValue}
          autoFocus={props.autoFocus}
          className={inputClassName}
          onBlur={onFocusout}
          onFocus={onFocus}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
        />
        <SearchIcon ref={searchRef} />
        <CloseIcon
          style={{ cursor: "pointer", display: "none" }}
          ref={closeRef}
          onClick={closeIconClick}
        />
      </div>
    </div>
  );
});

export default SearchInput;
