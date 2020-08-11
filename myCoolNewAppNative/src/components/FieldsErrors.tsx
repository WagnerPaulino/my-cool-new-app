import React from 'react';
import { FieldError } from "react-hook-form";
import { Text } from "react-native";

interface FieldsErrorsProps {
    field: FieldError;
    // type: string;
    // message: String;
}

export function FieldsErrors({ field }: FieldsErrorsProps) {
    if (field?.message) {
        return <Text>{field?.message}</Text>
    } else {
        return <></>
    }
}