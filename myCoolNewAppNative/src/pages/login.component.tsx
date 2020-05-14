import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch } from "react-redux";
import { logout, signInWithGoogleAccount } from '../actions/usuario-actions';

export function LoginComponent() {

    const dispatch = useDispatch();

    useEffect(() => {
        const getUser = () => {
            AsyncStorage.getItem('@userInfo').then((userInfo) => {
                if (userInfo !== null && userInfo !== undefined) {
                    Actions.push('desejos')
                }
            })
        }
        getUser();
    });

    return (
        <View>
            {/* <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => dispatch(signInWithGoogleAccount())}/> */}
            <Button onPress={() => dispatch(signInWithGoogleAccount())} title="Entrar com Google"></Button>
            <Button onPress={() => dispatch(logout())} title="Sair"></Button>
        </View>
    )
}