import React from "react";
import AppsIcon from "@material-ui/icons/Apps";
import PeopleIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ListIcon from "@material-ui/icons/List";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import StorageIcon from "@material-ui/icons/Storage";

const Icon = props => {
  switch (props.icon) {
    case "home":
      return <HomeIcon style={props.style} />;
    case "people":
      return <PeopleIcon style={props.style} />;
    case "apps":
      return <AppsIcon style={props.style} />;
    case "leftarrow":
      return <ArrowBackIosIcon style={props.style} onClick={props.onClick} />;
    case "rightarrow":
      return (
        <ArrowForwardIosIcon style={props.style} onClick={props.onClick} />
      );
    case "list":
      return <ListIcon />;
    case "account":
      return <AccountCircleIcon />;
    case "storage":
      return <StorageIcon />;
    default:
      return <React.Fragment />;
  }
};

export default Icon;
