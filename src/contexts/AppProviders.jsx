import { AuthContextProvider } from "./AuthContext";

function AppProviders({ children }) {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}

export default AppProviders;