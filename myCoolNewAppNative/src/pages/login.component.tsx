import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { View, Button } from 'react-native';
import { signInWithGoogleAccount, logout } from '../actions/usuario-actions';
import { FirebaseContext } from '../environment/context';
import { Actions } from 'react-native-router-flux';
export function LoginComponent() {

    const dispatch = useDispatch();
    const authState = useSelector((store: any) => store.auth.auth);

    const [user, setUser] = useState(authState?.currentUser);

    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const subscriber = firebase.getCurrentAuth().onAuthStateChanged((user) => setUser(user));
        return subscriber;
    });

    useEffect(() => {
        if (isLogged()) {
            Actions.push('desejos')
        }
    })

    function isLogged() {
        return user !== null && user !== undefined;
    }

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