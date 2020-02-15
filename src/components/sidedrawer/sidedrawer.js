import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AppsIcon from "@material-ui/icons/Apps";
import PeopleIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import ProductDetails from "../../product/productmaster/ProductMaster";
import CustomerDetails from "../../customer/customermaster/CustomerMaster";
import Category from "./../../category/category";
import ListData from "./../list/list";

const drawerWidth = 240;
const backgroundColor = "black";

const values = [
  {
    id: "view",
    name: "View",
    subItemId: "view-id",
    parentId: "view",
    close: false,
    subItem: [
      { parentId: "view", id: "catagory", name: "Catagory", icon: "home" },
      {
        parentId: "view",
        id: "customerdetails",
        name: "Customer Details",
        icon: "people"
      },
      {
        parentId: "view",
        id: "productdetails",
        name: "Product Details",
        icon: "apps"
      }
    ]
  }
];

const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  backDropZIndex: {
    zIndex: 30
  },
  drawerHome: {
    marginTop: "8px",
    marginLeft: "12px",
    cursor: "pointer"
  },
  drawerMenuIcon: {
    padding: "0px",
    marginLeft: "8px",
    color: "inherit"
  },
  appBarColor: {
    backgroundColor: backgroundColor,
    height: "48px",
    boxShadow: "none"
  },
  toolbarHeight: {
    minHeight: "48px"
  },
  listItemText: {
    marginBottom: 0
  },
  selected: {
    color: "blue"
  },
  unselected: {
    color: "black"
  },
  listIcon: {
    color: "red",
    minWidth: 30
  },
  drawerPaper: {
    width: drawerWidth
  },
  menuButton: {
    marginRight: 8
  },
  drawerBorder: {
    borderRight: "0px"
  },
  drawerHeader: {
    display: "flex",
    padding: "0 8px",
    minHeight: "48px !important",
    backgroundColor: backgroundColor,
    color: "white"
  }
}));

function SideDrawer(props) {
  const [initial, setInitial] = React.useState("");
  const [appName, changeAppName] = React.useState("Home");
  const classesData = useStyles();
  const [open, setOpen] = React.useState(false);
  const [listValues, setListValues] = React.useState(values);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const checkOpenCloseList = evnt => {
    const parntId = evnt.currentTarget.attributes.parentid.value;
    var dataValue = {};
    var listData = Object.assign([], listValues);
    var subItem = [];
    listData.map(data => {
      if (data.id === parntId && data.subItem) {
        subItem = data.subItem.filter(
          value => value.id === evnt.currentTarget.id
        );
        if (subItem.length === 0) {
          data.close = !data.close;
          dataValue = data;
        }
      }
    });
    if (!dataValue.subItem) {
      handleDrawerClose();
    }
    setListValues(listData);
  };

  const clickSideMenuHandler = event => {
    checkOpenCloseList(event);
    const targetId = event.currentTarget.id;
    console.log(event);
    if (targetId === "catagory") {
      setInitial("catagory");
      changeAppName("Catagory");
    } else if (targetId === "customerdetails") {
      setInitial("customerdetails");
      changeAppName("Customer Details");
    } else if (targetId === "productdetails") {
      setInitial("productdetails");
      changeAppName("Product Details");
    } else {
      setInitial("home");
      changeAppName("Home");
    }
  };
  function navigateToHome() {
    setInitial("home");
    changeAppName("Home");
    handleDrawerClose();
  }
  const checkDisplayingDrawerIcon = icon => {
    switch (icon) {
      case "home":
        return <HomeIcon />;
      case "people":
        return <PeopleIcon />;
      default:
        return <AppsIcon />;
    }
  };

  const setScreenVisible = id => {
    if (id === "catagory") {
      return <Category />;
    } else if (id === "customerdetails") {
      return <CustomerDetails />;
    } else if (id === "productdetails") {
      return <ProductDetails />;
    } else {
      return <React.Fragment />;
    }
  };
  return (
    <div>
      <AppBar
        position="fixed"
        classes={{ root: classesData.appBarColor }}
        className={clsx(classesData.appBar)}
      >
        <Toolbar classes={{ root: classesData.toolbarHeight }}>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classesData.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {appName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classesData.drawerPaper,
          paperAnchorDockedLeft: classesData.drawerBorder
        }}
      >
        <div className={classesData.drawerHeader}>
          <IconButton
            className={classesData.drawerMenuIcon}
            onClick={handleDrawerClose}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            className={classesData.drawerHome}
            onClick={navigateToHome}
          >
            Home
          </Typography>
        </div>
        <Divider />
        <ListData
          marginLeft="0"
          values={listValues}
          classesData={classesData}
          id="sidedrawer-list"
          initial={initial}
          clickSideMenuHandler={clickSideMenuHandler}
        />
      </Drawer>
      <main style={{ marginTop: "48px" }}>{setScreenVisible(initial)}</main>

      <Backdrop
        className={classesData.backDropZIndex}
        open={open}
        onClick={handleDrawerClose}
      ></Backdrop>
    </div>
  );
}

export default SideDrawer;
