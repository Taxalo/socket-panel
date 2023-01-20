import {Navigate} from "react-router-dom";
import {AuthStatus} from "../hooks/Auth";

type protectedRouteTypes = {
    token: string,
    children: JSX.Element
}

function ProtectedRoute({children}: protectedRouteTypes) {
    const {loggedIn, checkingStatus} = AuthStatus();

    if (checkingStatus) return null;

    return loggedIn ? children : <Navigate to='/login'/>
}

export default ProtectedRoute;