import React, { useEffect } from 'react';
import { Button, View, AsyncStorage } from 'react-native';
import { useDispatch } from "react-redux";
import { signInWithGoogleAccount, onUserInit } from '../actions/usuario-actions';

export function LoginComponent({ navigation }) {

    const dispatch = useDispatch();

    useEffect(() => {
        const getUser = () => {
            AsyncStorage.getItem('@userInfo').then((userInfo) => {
                if (userInfo !== null && userInfo !== undefined) {
                    dispatch(onUserInit());
                    navigation.replace('desejos');
                }
            })
        }
        getUser();
    });

    function sigin() {
        dispatch(signInWithGoogleAccount(navigation));
    }

    return (
        <View>
            {/* <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => dispatch(signInWithGoogleAccount())}/> */}
            <Button onPress={sigin} title="Entrar com Google"></Button>
        </View>
    )
}