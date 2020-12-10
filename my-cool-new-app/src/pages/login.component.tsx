import { Button, Container } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onUserInit, signInWithGoogleAccount } from "../actions/usuario-actions";
import { FirebaseContext } from "../environment/context";


export function LoginComponent({ history }: any) {

    const authState = useSelector((store: any) => store.auth.auth);

    const [user, setUser] = useState(authState?.currentUser);
    const dispatch = useDispatch();

    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        const subscriber = firebase.getCurrentAuth().onAuthStateChanged((user) => setUser(user));
        return subscriber;
    });

    useEffect(() => {
        if (isLogged()) {
            dispatch(onUserInit());
            history.push('/');
        }
    });

    function isLogged() {
        return user !== null && user !== undefined;
    }

    return (
        <div>
            <Container maxWidth="sm">
                <h1>Fazer Login</h1>
                <Button variant="contained" onClick={() => dispatch(signInWithGoogleAccount())}>Entrar usando o google</Button>
            </Container>
        </div>
    );
}
