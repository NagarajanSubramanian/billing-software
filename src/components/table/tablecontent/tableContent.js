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
    maxWidth: 100
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

  const loadContextMenu = (props, value, keys, index) => {
    if (props.contextMenu) {
      return (
        <TableCell key={index + keys.fieldId} className={classes.root}>
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
      <React.Fragment />;
    }
  };
  return (
    <TableBody>
      {props.content.map((value, index) => (
        <TableRow hover key={index}>
          {props.headerProps.map(keys => {
            return (
              <TableCell key={index + keys.fieldId} className={classes.root}>
                <Typography
                  variant="body2"
                  className={classes.root}
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {value[keys.fieldId]}
                </Typography>
              </TableCell>
            );
          })}
          {loadContextMenu(props, value, keys, index)}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default withStyles(style)(TableContentData);
