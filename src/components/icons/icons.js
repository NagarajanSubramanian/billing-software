import React from "react";
import AppsIcon from "@material-ui/icons/Apps";
import PeopleIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

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
    default:
      return <React.Fragment />;
  }
};

export default Icon;
