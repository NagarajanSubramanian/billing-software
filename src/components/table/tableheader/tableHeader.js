import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
  tablecellRoot: {
    padding: "0px 2px",
    textAlign: "center"
  },
  headerTypography: {
    fontSize: "16px",

    fontWeight: "900"
  }
}));

const TableHeaderData = props => {
  const style = useStyle();
  return (
    <TableHead>
      <TableRow>
        {props.headerData.map((data, index) => (
          <TableCell
            size="small"
            key={data.fieldId}
            classes={{ root: style.tablecellRoot }}
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
      </TableRow>
    </TableHead>
  );
};

export default TableHeaderData;
