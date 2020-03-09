import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
  tablecellRoot: {
    padding: "0px 2px"
  },
  headerTypography: {
    fontSize: "16px",

    fontWeight: "900"
  },
  rowHeight: {
    height: "40px"
  }
}));

const loadContextMenuHeader = (props, style) => {
  if (props.contextMenu) {
    return (
      <TableCell
        size="small"
        classes={{ root: style.tablecellRoot }}
      ></TableCell>
    );
  } else {
    return <React.Fragment />;
  }
};

const alignValue = align => {
  if (align === "left") {
    return "left";
  } else if (align === "right") {
    return "right";
  } else {
    return "center";
  }
};

const TableHeaderData = props => {
  const style = useStyle();
  return (
    <TableHead>
      <TableRow className={style.rowHeight}>
        {props.headerData.map((data, index) => (
          <TableCell
            size="small"
            key={data.fieldId}
            classes={{ root: style.tablecellRoot }}
            align={alignValue(data.headerAlign)}
          >
            <Typography
              classes={{ root: style.headerTypography }}
              variant="h6"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {data.headerName}
            </Typography>
          </TableCell>
        ))}
        {loadContextMenuHeader(props, style)}
      </TableRow>
    </TableHead>
  );
};

export default TableHeaderData;
