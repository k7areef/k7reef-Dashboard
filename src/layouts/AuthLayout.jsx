import { useAuthContext } from "@contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function AuthLayout() {

    const { isAuth } = useAuthContext();

    // Redirect to dashboard if authenticated
    if (isAuth) return <Navigate to="/dashboard" replace />

    return (
        <div className="auth-layout">
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default AuthLayout;