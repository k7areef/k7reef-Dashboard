import Button from '@components/UI/Button';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { supabase } from '@utils/supabaseClient';
import React from 'react'
import { useLocation } from 'react-router-dom';

const LogoutConfirmationContext = React.createContext();

export const LogoutConfirmationContextProvider = ({ children }) => {

    // Hooks:
    const { pathname } = useLocation();

    // States:
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const closeModal = React.useCallback(() => setIsOpen(false), []);
    const openModal = React.useCallback(() => setIsOpen(true), []);
    // Effects:
    React.useEffect(() => { // Close modal on route change
        setIsOpen(false);
    }, [pathname]);

    // Handlers:
    const handleLogout = React.useCallback(async () => { // Logout
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.log(error);
                throw error;
            };
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Memo:
    const childrens = React.useMemo(() => { // Modal Children
        return (
            <div
                onClick={e => e.stopPropagation()}
                className='modal-childrens text-center bg-card-bg p-5 rounded-lg border-2 border-accent-soft md:max-w-130 md:mx-auto space-y-3'
            >
                {/* Icons */}
                <div className="logout-icon w-12 h-12 rounded-full flex items-center justify-center bg-accent-soft mx-auto border-2 border-primary/50 text-primary">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
                {/* Text */}
                <div className="text">
                    <h3 className='mb-1 font-semibold text-lg md:text-xl text-white'>Confim Logout</h3>
                    <p className='text-muted-text'>
                        Are you sure you want to end your session?
                        You will need to log back in to access the admin area.
                    </p>
                </div>
                {/* Actions */}
                <div className="actions *:w-full flex items-center gap-3">
                    <Button
                        title="Cancel"
                        disabled={isLoading}
                        variant='secondary'
                        aria-label="Cancel"
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        title="Logout"
                        disabled={isLoading}
                        onClick={handleLogout}
                        aria-label="Logout"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        )
    }, [closeModal, handleLogout, isLoading]);

    return (
        <LogoutConfirmationContext.Provider value={{
            isOpen,
            closeModal,
            openModal,
            childrens,
            isLoading
        }}>
            {children}
        </LogoutConfirmationContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLogoutConfirmationContext = () => React.useContext(LogoutConfirmationContext);