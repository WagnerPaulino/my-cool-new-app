import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { FirebaseContext } from "../environment/context";

export default function PrivateRoute(params: any) {
    const { component, ...rest } = params;
    const firebase = useContext(FirebaseContext);
    return (
        <Route {...rest} render={props => (
            firebase.isLogged() ? (component) : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )}></Route>
    );
}