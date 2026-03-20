import React from 'react'
import { supabase } from '@utils/supabaseClient';

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [isAuth, setIsAuth] = React.useState(false);

    React.useEffect(() => { // Check if user is logged in

        setIsLoading(true);

        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAuth(!!session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuth(!!session);
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoading,
            isAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => React.useContext(AuthContext);