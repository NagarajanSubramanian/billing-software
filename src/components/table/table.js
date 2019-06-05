import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHeader from './tableheader/tableHeader';
import TableContent from './tablecontent/tableContent';
import clsx from 'clsx';


const styles = {
    root: {
        width: '60%',
        overflowX: 'auto',
        marginTop: '8px !important',
        margin: 'auto'
    },
    table: {
        border: '1px solid lightgrey',
        minWidth: 700
    }
};


const TableData = (props) => {

    const {classes} = props;
    return (
        <Paper className={classes.root}>
            <Table className={clsx(props.className, classes.table)}>
                <TableHeader headerData = {props.header} width={props.width}/>
                <TableContent content = {props.data} handleMenuClick={(data) => props.handleMenuClick(data)}/>
            </Table>
        </Paper>
    );
};

export default withStyles(styles)(TableData);