import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Paper } from '@material-ui/core';
import React from 'react';
import { Loja } from '../models/Loja';

interface Props {
    lojas: Loja[];
}

export function LojaDefaultDataTable({ lojas }: Props) {
    return (
        <>
            <TableContainer component={Paper}>
                <Table size="medium" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th">Nome</TableCell>
                            <TableCell component="th">Url</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lojas.map((row) => (
                            <TableRow key={row?._id}>
                                <TableCell align="left">{row?.nome}</TableCell>
                                <TableCell align="left"><a target="blank">{row?.url}</a></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}