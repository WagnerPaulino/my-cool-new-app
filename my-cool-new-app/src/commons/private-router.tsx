import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, predicate }: any) {
    let isAuthenticated = predicate();
    return isAuthenticated ? children : <Navigate to={"/login"} />;
}