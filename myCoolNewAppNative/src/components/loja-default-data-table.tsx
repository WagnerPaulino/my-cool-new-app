import React from 'react';
import { Loja } from '../models/Loja';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';

interface Props {
    lojas: Loja[];
}

export function LojaDefaultDataTable({ lojas }: Props) {
    return (
        <View>
            {
                lojas.map((item, i) => (
                    <ListItem key={i} title={item.nome}
                        subtitle={item.url} bottomDivider />
                ))
            }
        </View>
    )
}