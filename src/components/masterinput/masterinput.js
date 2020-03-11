import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import ListData from "./../list/list";

const MasterInput = React.forwardRef((props, ref) => {
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

  return (
    <React.Fragment>
      <TextField
        id={props.id}
        fullWidth={props.fullWidth}
        style={props.style}
        label={props.label}
      />
      <Paper
        id={props.id + "-render"}
        elevation={3}
        style={{ width: "180px", height: "195px" }}
      >
        <div style={{ height: "85%", borderBottom: "1px solid grey" }}>
          <ListData
            marginLeft="0"
            values={menuData}
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
