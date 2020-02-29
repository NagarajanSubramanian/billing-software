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
  }
}));

function checkSubItem(value, classesData, initial, props) {
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

export default function ListData(props) {
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
              selected={
                text.id === props.initial && !text.subItem ? true : false
              }
              className={clsx(
                { [classesData.unselected]: text.id !== props.initial },
                { [classesData.selected]: text.id === props.initial }
              )}
              onClick={props.clickSideMenuHandler}
            >
              <ListItemIcon
                className={classesData.listIcon}
                style={{ paddingLeft: marginLeft + "px" }}
              >
                <Icon icon={text.icon} />
              </ListItemIcon>
              <ListItemText
                className={classesData.listItemText}
                primary={text.name}
              />
            </ListItem>
            {checkSubItem(text, classesData, props.initial, props)}
          </React.Fragment>
        ))}
      </List>
    </React.Fragment>
  );
}
