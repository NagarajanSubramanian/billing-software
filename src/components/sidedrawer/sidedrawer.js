import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import ProductDetails from "../../screen/productmaster/ProductMaster";
import CustomerDetails from "../../screen/customermaster/CustomerMaster";
import Category from "./../../screen/category/category";
import Supplier from "./../../screen/supplier/supplierData";
import ListData from "./../list/list";
import { APP_BAR_COLOR } from "./../../constants/constants";
import MasterInput from "./../masterinput/masterinputnew";
import SearchInput from "./../searchinput/searchInput";
import BillingTable from "./../../screen/billing/billing";
import Grid from "./../../components/grid/grid";
import TextField from "./../textfield/textfield";

const drawerWidth = 240;
const backgroundColor = "var(--app-bar-color)";

const values = [
  {
    id: "view",
    name: "View",
    subItemId: "view-id",
    parentId: "view",
    icon: "apps",
    close: false,
    subItem: [
      { parentId: "view", id: "catagory", name: "Catagory", icon: "storage" },
      { parentId: "view", id: "supplier", name: "Supplier", icon: "account" },
      // {
      //  parentId: "view",
      //  id: "customerdetails",
      // name: "Customer Details",
      // icon: "people"
      //},
      {
        parentId: "view",
        id: "productdetails",
        name: "Product Details",
        icon: "list",
      },
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  backDropZIndex: {
    zIndex: 30,
  },
  drawerHome: {
    marginTop: "8px",
    marginLeft: "12px",
    cursor: "pointer",
  },
  drawerMenuIcon: {
    padding: "0px",
    marginLeft: "8px",
    color: "inherit",
  },
  appBarColor: {
    backgroundColor: backgroundColor,
    height: "48px",
    boxShadow: "none",
  },
  toolbarHeight: {
    minHeight: "48px",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    marginRight: 8,
  },
  drawerBorder: {
    borderRight: "0px",
  },
  drawerHeader: {
    display: "flex",
    padding: "0 8px",
    minHeight: "48px !important",
    backgroundColor: backgroundColor,
    color: "white",
  },
}));

function SideDrawer(props) {
  const [initial, setInitial] = React.useState("home");
  const [appName, changeAppName] = React.useState("Home");
  const classesData = useStyles();
  const [open, setOpen] = React.useState(false);
  const [listValues, setListValues] = React.useState(values);
  const masterRef = React.createRef();

  const handleDrawerOpen = () => {
    setOpen(true);
    document.body.classList.add("scrollhidden");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    document.body.classList.remove("scrollhidden");
  };
  const checkOpenCloseList = (evnt) => {
    const parntId = evnt.currentTarget.attributes.parentid.value;
    var dataValue = {};
    var listData = Object.assign([], listValues);
    var subItem = [];
    listData.map((data) => {
      if (data.id === parntId && data.subItem) {
        subItem = data.subItem.filter(
          (value) => value.id === evnt.currentTarget.id
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

  const clickSideMenuHandler = (event) => {
    checkOpenCloseList(event);
    const targetId = event.currentTarget.id;
    if (targetId === "catagory") {
      setInitial("catagory");
      changeAppName("Catagory");
    } else if (targetId === "customerdetails") {
      setInitial("customerdetails");
      changeAppName("Customer Details");
    } else if (targetId === "productdetails") {
      setInitial("productdetails");
      changeAppName("Product Details");
    } else if (targetId === "supplier") {
      setInitial("supplier");
      changeAppName("Supplier");
    } else if (targetId === "home") {
      setInitial("home");
      changeAppName("Home");
    }
  };
  function navigateToHome() {
    setInitial("home");
    changeAppName("Home");
    handleDrawerClose();
  }

  const setScreenVisible = (id) => {
    if (id === "catagory") {
      return <Category />;
    } else if (id === "customerdetails") {
      return <CustomerDetails />;
    } else if (id === "productdetails") {
      return <ProductDetails />;
    } else if (id === "supplier") {
      return <Supplier />;
    } else {
      return (
        <Grid
          width="90%"
          height="50%"
          headerHeight={40}
          rowHeight={35}
          enterToNextCell={true}
          editable={true}
          columns={[
            {
              id: "id1",
              field: "id1",
              editable: true,
              width: "10%",
              headerName: "Data",
              headerBold: true,
              headerHorizontalAlign: "center",
              headerVerticalAlign: "middle",
              horizontalAlign: "right",
              editable: true,
              type: "number",
            },
            {
              id: "id2",
              field: "id2",
              editable: true,
              width: "20%",
              headerBold: true,
              headerName: "Sample1234567890056ry56",
              type: "text",
            },
            {
              id: "id3",
              field: "id3",
              editable: true,
              width: "40%",
              headerBold: true,
              headerName: "Sample1234567890056",
            },
          ]}
          data={[
            { id1: "123", id2: "value2" },
            { id1: "123", id2: "value3" },
          ]}
        />
      );

      //return <TextField length={500} ref={masterRef} id="sample-check" />;
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
          paperAnchorDockedLeft: classesData.drawerBorder,
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
      <main style={{ marginTop: "48px", height: "calc(100vh - 48px)" }}>
        {setScreenVisible(initial)}
      </main>

      <Backdrop
        className={classesData.backDropZIndex}
        open={open}
        onClick={handleDrawerClose}
      ></Backdrop>
    </div>
  );
}

export default SideDrawer;
