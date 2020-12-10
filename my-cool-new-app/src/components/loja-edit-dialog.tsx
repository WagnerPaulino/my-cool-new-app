import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';
import { Loja } from '../models/Loja';
import { useForm, Controller } from 'react-hook-form';
import { FieldsErrors } from './FieldsErrors';

export function LojaEditDialog(props: { onClose: (value?: any) => void, open: boolean }) {
    const { onClose, open } = props;

    const [loja, setLoja] = useState<Loja>(new Loja());

    const { control, handleSubmit, errors, reset } = useForm<Loja>({ defaultValues: loja, reValidateMode: 'onChange' });

    const handleClose = (data: any | Loja) => {
        if (onClose) {
            onClose(data);
        }
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="alert-dialog-title">Loja para comprar</DialogTitle>
            <DialogContent>
                <Controller control={control} defaultValue={loja?.nome} rules={{
                    required: {
                        value: true,
                        message: "O campo nome é obrigatorio"
                    },
                }} name="nome" render={({ onChange, onBlur, value }) => (
                    <TextField autoFocus style={fullWidthStyle} name="nome" label="Nome" value={value} onChange={onChange} onBlur={onBlur}></TextField>
                )
                } />
                <FieldsErrors field={errors.nome} />
                <Controller control={control} defaultValue={loja?.url} name="url" render={({ onChange, onBlur, value }) => (
                    <TextField style={fullWidthStyle} name="url" label="Url" value={value} onChange={onChange} onBlur={onBlur}></TextField>
                )
                } />
                <FieldsErrors field={errors.url} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancelar</Button>
                <Button onClick={handleSubmit(handleClose)} color="primary">Concluir</Button>
            </DialogActions>
        </Dialog>
    )
}

const fullWidthStyle = {
    width: '100%'
};