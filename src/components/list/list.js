import React from "react";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "./../icons/icons";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
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
  focusVisible: {
    color: "blue"
  }
}));

const ListData = React.forwardRef((props, ref) => {
  function checkSubItem(value, classesData, initial) {
    const marginLeft = parseInt(props.marginLeft);
    if (value.subItem && value.close) {
      return (
        <ListData
          key={value.id}
          values={value.subItem}
          classesData={classesData}
          id={value.subItemId}
          marginLeft={marginLeft + 20}
          initial={initial}
          clickSideMenuHandler={props.clickSideMenuHandler}
        />
      );
    } else {
      return <React.Fragment />;
    }
  }

  function loadIcon(classesData, marginLeft, text) {
    if (text.icon) {
      return (
        <ListItemIcon
          className={classesData.listIcon}
          style={{ paddingLeft: marginLeft + "px" }}
        >
          <Icon icon={text.icon} />
        </ListItemIcon>
      );
    }
  }

  const marginLeft = parseInt(props.marginLeft);
  var classesData = styles();
  return (
    <React.Fragment>
      <List id={props.id}>
        {props.values.map((text, index) => (
          <React.Fragment>
            <ListItem
              button
              id={text.id}
              key={text.id}
              parentid={text.parentId}
              style={props.style}
              selected={
                text.id === props.initial && !text.subItem ? true : false
              }
              className={clsx(
                { [classesData.unselected]: text.id !== props.initial },
                { [classesData.selected]: text.id === props.initial }
              )}
              classes={{ focusVisible: classesData.focusVisible }}
              onClick={props.clickSideMenuHandler}
            >
              {loadIcon(classesData, marginLeft, text)}
              <ListItemText
                disableTypography={props.disableTypography}
                title={text.name}
                id={text.id}
                key={text.id}
                parentid={text.parentId}
                style={props.listItemStyle}
                className={classesData.listItemText}
                primary={text.name}
              />
            </ListItem>
            {checkSubItem(text, classesData, props.initial)}
          </React.Fragment>
        ))}
      </List>
    </React.Fragment>
  );
});

export default ListData;
