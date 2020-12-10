import { Button, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';

export function LojaEditDialog(props: { onClose: (value?: any) => void, open: boolean }) {
    const { onClose, open } = props;

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="alert-dialog-title">Loja para comprar</DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancelar</Button>
                <Button onClick={handleClose} color="primary">Concluir</Button>
            </DialogActions>
        </Dialog>
    )
}