import React from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import ProductDetails from "../../product/productmaster/ProductMaster";
import CustomerDetails from "../../customer/customermaster/CustomerMaster";
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
    <Router>
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
            {[
              { name: "Home", path: "/" },
              { name: "Customer Master", path: "/CustomerMaster" },
              { name: "Product Master", path: "/ProductMaster" }
            ].map((text, index) => (
              <ListItem
                button
                id={text.name}
                key={text.name}
                onClick={clickSideMenuHandler}
              >
                <Link to={text.path}>{text.name}</Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Switch>
          <Route exact path="/CustomerMaster" component={CustomerDetails} />
          <Route exact path="/ProductMaster" component={ProductDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default SideDrawer;
