import React from "react";
import AppsIcon from "@material-ui/icons/Apps";
import PeopleIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";

const Icon = props => {
  switch (props.icon) {
    case "home":
      return <HomeIcon />;
    case "people":
      return <PeopleIcon />;
    case "apps":
      return <AppsIcon />;
    default:
      return <React.Fragment />;
  }
};

export default Icon;
