import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHeader from './tableheader/tableHeader';
import TableContent from './tablecontent/tableContent';
import clsx from 'clsx';


const styles = {
    table: {
        border: '1px solid lightgrey',
        marginTop: '8px !important',
        borderRadius: 10
    }
};


const TableData = (props) => {
    const {classes} = props;
    return (
        <Table className={clsx(props.className, classes.table)}>
            <TableHeader headerData = {props.header} width={props.width}/>
            <TableContent content = {props.data} handleMenuClick={(data) => props.handleMenuClick(data)}/>
        </Table>
    );
};

export default withStyles(styles)(TableData);