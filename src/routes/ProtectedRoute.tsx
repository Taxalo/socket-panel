import {Navigate} from "react-router-dom";

type protectedRouteTypes = {
    token: string,
    children: JSX.Element
}

function ProtectedRoute({token, children}: protectedRouteTypes) {
    // TODO: Aplicar a server.
    if (!token || token.length < 10) return <Navigate to="/login" replace/>;

    return children;
}

export default ProtectedRoute;