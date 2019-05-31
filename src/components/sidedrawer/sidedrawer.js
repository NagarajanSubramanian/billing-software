import React from "react";
import clsx from 'clsx';
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from  '@material-ui/icons/Apps';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import ProductDetails from "../../product/productmaster/ProductMaster";
import CustomerDetails from "../../customer/customermaster/CustomerMaster";

const drawerWidth = 240;

const styleCheck = {
  selected : {
    color: 'blue'
  },
  unselected: {
    color: 'black'
  },
  listIcon: {
    color : 'red',
    minWidth: 30
  },
  listItemText : {
    marginBottom: 0
  }
};


const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaper: {
    width: drawerWidth
  },
  menuButton: {
    marginRight: 8,
  },
  hide: {
    display: 'none',
  },
  drawerHeader: {
    display: 'flex',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  overrides:{
    MuiListItemIcon : {
      root : {
        minWidth : 10,
      }
    }
  }
}));


function SideDrawer(props) {
  const [initial, setInitial] = React.useState('home');
  const [appName, changeAppName] = React.useState('Home');
  const classesData = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

   const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }
  const clickSideMenuHandler = event => {
    const targetId = event.currentTarget.id;
    if(targetId === 'home'){
      setInitial('home');
      changeAppName('Home');
    } else if(targetId === 'customerdetails'){
      setInitial('customerdetails');
      changeAppName('Customer Details');
    } else {
      setInitial('productdetails');
      changeAppName('Product Details');
    }
  };

  const checkDisplayingDrawerIcon = (icon) => {
    switch(icon){
      case 'home': 
        return <HomeIcon/>;
      case 'people':
        return <PeopleIcon/>;
      default :
        return <AppsIcon/>;
    }
  }

  const setScreenVisible = (id) => {
    if(id === 'home'){
      return <React.Fragment/>;
    } else if(id === 'customerdetails'){
      return <CustomerDetails/>
    } else {
      return <ProductDetails/>;
    }
  }
  const { classes } = props;
  return (
      <div>
      <AppBar
        position="fixed"
        className={clsx(classesData.appBar, {
          [classesData.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classesData.menuButton, {
              [classesData.hide]: open,
            })}
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
            paper: classesData.drawerPaper
          }}>
            <div className={classesData.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
          <List id="sidedrawer-list">
            {[
              { id: 'home', name: "Home", icon: 'home'},
              { id: 'customerdetails', name: "Customer Details", icon:'people' },
              { id: 'productdetails', name: "Product Details", icon:'apps' }
            ].map((text, index) => (
              <ListItem
                button
                id={text.id}
                key={text.id}
                selected={text.id === initial ? true : false}
                className= {clsx({[classes.unselected]: text.id !== initial}, {[classes.selected] : text.id === initial})}
                onClick={clickSideMenuHandler}>
                <ListItemIcon className={classes.listIcon}>{checkDisplayingDrawerIcon(text.icon)}</ListItemIcon>
                <ListItemText className={classes.listItemText} primary={text.name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <div className={classesData.drawerHeader}/>
        {setScreenVisible(initial)}
      </div>
  );
}

export default withStyles(styleCheck)(SideDrawer);
