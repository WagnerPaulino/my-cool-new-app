import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, predicate, ...rest }: any) {
    return (
        <Route
            {...rest}
            render={(props) =>
                predicate() ?
                    <Component {...props} />
                    : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}