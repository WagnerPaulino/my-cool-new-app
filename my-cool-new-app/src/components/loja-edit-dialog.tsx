import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Loja } from '../models/Loja';
import { FieldsErrors } from './FieldsErrors';

export function LojaEditDialog(props: { onClose: (value?: any) => void, open: boolean }) {
    const { onClose, open } = props;

    const [loja] = useState<Loja>(new Loja());

    const { control, handleSubmit, formState } = useForm<Loja>({ defaultValues: loja, reValidateMode: 'onChange' });
    const { errors } = formState;

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
                }} name="nome" render={({ field }) => {
                    const { onBlur, onChange, value } = field;
                    return (
                        <TextField autoFocus style={fullWidthStyle} name="nome" label="Nome" value={value} onChange={onChange} onBlur={onBlur}></TextField>
                    )
                }
                } />
                <FieldsErrors field={errors.nome} />
                <Controller control={control} defaultValue={loja?.url} name="url" render={({ field }) => {
                    const { onBlur, onChange, value } = field;
                    return (
                        <TextField style={fullWidthStyle} name="url" label="Url" value={value} onChange={onChange} onBlur={onBlur}></TextField>
                    )
                }
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