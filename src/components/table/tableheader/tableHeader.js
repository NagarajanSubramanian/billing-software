import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

const TableHeaderData = (props) => {
    return (
    <TableHead>
        <TableRow>
            {
                props.headerData.map((data, index) => (
                    <TableCell key={index} style={{
                        maxWidth: 100
                    }}>
                        <Typography variant="h6" style={{                                   
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                        }}>
                            {data}
                        </Typography>
                    </TableCell>
                ))
            }
        </TableRow>
    </TableHead>
    );
}

export default TableHeaderData;