import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UseAppSelector } from "../store/configureStore";

export default function RequireAuth() {
    const { user } = UseAppSelector(state => state.account);
    const location = useLocation();

    if (!user) {
        return <Navigate to='/SignIn' state={{ from: location }} />
    }

    return <Outlet />
}