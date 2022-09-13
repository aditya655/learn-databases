import React, { Component } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles';

class BasicTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: null,
            tables: null,
            columns: []
        };
    }
    render() {
        const theme = createTheme({
            overrides: {
                MuiTableCell: {
                    root: {  //This can be referred from Material UI API documentation. 
                        padding: '2px 2px',
                        backgroundColor: "#eaeaea",
                    },
                },
            },
        });
        console.log(this.props.children)
        const tablerows = this.props.columns
        return (
            
            <TableContainer component={Paper} >
                <ThemeProvider theme={theme}>
                    <Table sx={{ maxWidth: 850 }} size ="small" aria-label="simple table">
                        <TableHead sx={{ border: 3, borderColor: "#021EA4", }}>
                            <TableRow sx={{ fontWeight: "bold", }}>
                                <TableCell sx={{ fontWeight: "bold", }}>Column Name</TableCell>
                                <TableCell sx={{ fontWeight: "bold", }}>DataType</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">NULLABLE</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="right">KEY</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ border: 1, borderColor: "#021EA4", }}>
                            {tablerows.map((row) => (
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell>{row.dataType}</TableCell>
                                    <TableCell align="center">{row.nullable}</TableCell>
                                    <TableCell align="right">{row.iskey}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ThemeProvider>
            </TableContainer>
        );
    }
}
 
export default BasicTable;









