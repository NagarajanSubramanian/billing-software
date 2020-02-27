import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHeader from "./tableheader/tableHeader";
import TableContent from "./tablecontent/tableContent";
import clsx from "clsx";

const styles = {
  root: {
    width: "90%",
    overflowX: "auto",
    marginTop: "8px !important",
    margin: "auto"
  },
  table: {
    border: "1px solid lightgrey"
  }
};

const TableData = props => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={clsx(props.className, classes.table)}>
        <colgroup>
          {props.width.map((data, i) => (
            <col width={data} key={i} />
          ))}
        </colgroup>
        <TableHeader headerData={props.header} width={props.width} />
        <TableContent
          headerProps={props.header}
          contextMenu={props.contextMenu}
          content={props.data}
          fieldId={props.fieldId}
          handleMenuClick={data => props.handleMenuClick(data)}
        />
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(TableData);
