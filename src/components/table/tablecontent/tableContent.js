import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

const TableContentData = (props) => {
    return (
        <TableBody>
            {
                props.content.map((value, index) => (
                    <TableRow key={index}>
                        {
                            Object.keys(value).map(keys => (
                                <TableCell key={keys}>
                                    <Typography variant='body2'>
                                        {value[keys]}
                                    </Typography>
                                </TableCell>
                            ))
                        }
                    </TableRow>
                ))
            }
        </TableBody>
    );
};

export default TableContentData;