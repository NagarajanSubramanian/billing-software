import React, { useState } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { withStyles } from "@material-ui/core/styles";

const style = {
  root: {
    padding: "0px 2px"
  },
  contentRowHeight: {
    height: "32px"
  }
};

const TableContentData = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleClick = event => {
    setOpen(true);
    setId(event.currentTarget.value);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = event => {
    setOpen(false);
    props.handleMenuClick({
      id: id,
      menuId: event.target.getAttribute("data")
    });
  };
  const { classes } = props;

  const loadContextMenu = (props, value, index) => {
    if (props.contextMenu) {
      return (
        <TableCell key={index + props.fieldId} className={classes.root}>
          <IconButton
            aria-label="More"
            aria-owns={false ? "long-menu" : undefined}
            aria-haspopup="true"
            value={value[props.fieldId]}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {["edit", "view"].map(option => (
              <MenuItem data={option} key={option} onClick={handleMenuClick}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </TableCell>
      );
    } else {
      return <React.Fragment />;
    }
  };

  const alignValue = align => {
    if (align === "left") {
      return "left";
    } else if (align === "right") {
      return "right";
    } else {
      return "center";
    }
  };

  const setValue = (keys, numberField, value, index) => {
    if (keys.field === numberField) {
      return index + 1;
    } else {
      if (keys.type === "number" && keys.commaSeparate && value) {
        return parseFloat(value).toLocaleString("en-IN");
      }
      return value;
    }
  };

  return (
    <TableBody>
      {props.content.map((value, index) => (
        <TableRow hover key={index} className={classes.contentRowHeight}>
          {props.headerProps.map(keys => {
            return (
              <TableCell
                key={index + keys.field}
                className={classes.root}
                align={alignValue(keys.align)}
              >
                <Typography
                  variant="body2"
                  className={classes.root}
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {setValue(keys, props.numberField, value[keys.field], index)}
                </Typography>
              </TableCell>
            );
          })}
          {loadContextMenu(props, value, index)}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default withStyles(style)(TableContentData);
