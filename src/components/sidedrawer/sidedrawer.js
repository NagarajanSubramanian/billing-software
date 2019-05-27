import React from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import "./SideDrawer.css";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: drawerWidth
  }
}));

function SideDrawer(props) {
  const classes = useStyles();
  const clickSideMenuHandler = event => {
    console.log(event.target.id);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Billing - Software
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Divider />
        <List id="sidedrawer-list">
          {["Customer Master", "Product Master"].map((text, index) => (
            <ListItem
              button
              id={text}
              key={text}
              onClick={clickSideMenuHandler}
            >
              {text}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default SideDrawer;
