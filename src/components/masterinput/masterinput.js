import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import ListData from "./../list/list";

const MasterInput = React.forwardRef((props, ref) => {
  var renderId = props.id + "-render";
  var [selectedIndex, setSelectIndex] = React.useState(-1);
  var [selectedId, setSelectedId] = React.useState("");
  var [defaultValue, setDefaultValue] = React.useState("");
  var inputRef = React.createRef();
  var mainRef = React.createRef();
  var menuData = [
    { parentId: "1", id: "1", name: "Catagory" },
    { parentId: "2", id: "2", name: "Supplier" },
    {
      parentId: "3",
      id: "3",
      name: "Customer"
    },
    { parentId: "4", id: "4", name: "Catagory" },
    {
      parentId: "5",
      id: "5",
      name: "CustomerCustomerCustomerCustomer"
    }
  ];

  useOutsideAlerter();

  function useOutsideAlerter() {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      var total = document.getElementById(renderId).querySelectorAll("*");
      var input = document
        .getElementById(renderId)
        .previousElementSibling.querySelectorAll("*");
      var list = [];

      list.push(document.getElementById(renderId));
      list.push(document.getElementById(renderId).previousElementSibling);
      for (var i = 0; i < total.length; i++) {
        list.push(total[i]);
      }
      for (var i = 0; i < input.length; i++) {
        list.push(input[i]);
      }
      if (list.indexOf(event.target) < 0) {
        document.getElementById(renderId).style.display = "none";
      }
    }

    React.useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }

  function onChange(event) {
    var rect = event.currentTarget.getBoundingClientRect();
    var render = document.getElementById(renderId);
    render.style.position = "relative";
    render.style.left = rect.x + "px";
    render.style.width = rect.width + "px";
    render.style.top = "-2px";
    render.style.display = "block";
  }

  function onKeyUp(event) {
    if (event.which === 38 || event.which === 40) {
      if (event.which === 40) {
        if (selectedIndex === -1) {
          setSelectedId(menuData[selectedIndex + 1].id);
          setSelectIndex(0);
        } else if (selectedIndex === 4) {
        } else {
          setSelectedId(menuData[selectedIndex + 1].id);
          setSelectIndex(selectedIndex + 1);
        }
      } else {
        if (selectedIndex === 4) {
          setSelectedId(menuData[selectedIndex - 1].id);
          setSelectIndex(selectedIndex - 1);
        } else if (selectedIndex === 0) {
        } else {
          setSelectedId(menuData[selectedIndex - 1].id);
          setSelectIndex(selectedIndex - 1);
        }
      }
    } else if (event.which === 13) {
      if (selectedIndex >= 0) {
        console.log(inputRef);
        inputRef.current.value = menuData[selectedIndex].name;
        mainRef.current.attributes.valuedata.value = menuData[selectedIndex].id;
        setDefaultValue(menuData[selectedIndex].name);
        document.getElementById(renderId).style.display = "none";
      }
    }
  }

  return (
    <React.Fragment>
      <TextField
        id={props.id}
        fullWidth={props.fullWidth}
        style={props.style}
        label={props.label}
        onChange={onChange}
        inputRef={inputRef}
        ref={mainRef}
        onKeyUp={onKeyUp}
        valuedata={89}
        defaultValue={defaultValue}
      />
      <Paper
        id={renderId}
        elevation={3}
        style={{ width: "180px", height: "195px", display: "none" }}
      >
        <div style={{ height: "85%", borderBottom: "1px solid grey" }}>
          <ListData
            marginLeft="0"
            values={menuData}
            initial={selectedId}
            id="sidedrawer-list"
            disableTypography={true}
            style={{
              padding: "2px",
              fontSize: "25px",
              height: "28px",
              display: "grid"
            }}
            listItemStyle={{
              height: "inherit",
              fontSize: "17px",
              margin: "2px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "sans-serif",
              display: "table-cell",
              verticalAlign: "middle"
            }}
          />
        </div>
      </Paper>
    </React.Fragment>
  );
});

export default MasterInput;
