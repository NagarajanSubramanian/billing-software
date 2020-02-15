import React from "react";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
  var classesData = props.classesData;
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
              <ListItemText
                style={{ paddingLeft: marginLeft + "px" }}
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
