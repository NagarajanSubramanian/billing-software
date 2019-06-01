import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHeader from './tableheader/tableHeader';
import TableContent from './tablecontent/tableContent';


const styles = {
    table: {
        minWidth: 650
    }
};


const TableData = (props) => {
    return (
        <Table>
            <TableHeader headerData = {props.header}/>
            <TableContent content = {props.data} handleMenuClick={(data) => props.handleMenuClick(data)}/>
        </Table>
    );
};

export default withStyles(styles)(TableData);