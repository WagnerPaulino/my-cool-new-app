import React from 'react';
import { FieldError } from "react-hook-form";

interface FieldsErrorsProps {
    field: FieldError | undefined;
    // type: string;
    // message: String;
}

export function FieldsErrors({ field }: FieldsErrorsProps) {
    if (field?.message) {
        return <span>{field?.message}</span>
    } else {
        return <></>
    }
}