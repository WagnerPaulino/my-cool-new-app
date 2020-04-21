import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, predicate, ...rest }: any) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                predicate() ?
                    (children)
                    : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}