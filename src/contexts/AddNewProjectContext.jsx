import React from 'react'
import { useLocation } from 'react-router-dom';

const AddNewProjectContext = React.createContext();

export const AddNewProjectProvider = ({ children }) => {

    // Hooks:
    const { pathname } = useLocation();

    // States:
    const [isOpen, setIsOpen] = React.useState(false);

    // Effect:
    React.useEffect(() => { // Close modal on route change
        setIsOpen(false);
    }, [pathname]);

    // Handlers:
    const openModal = React.useCallback(() => setIsOpen(true), []);
    const closeModal = React.useCallback(() => setIsOpen(false), []);

    return (
        <AddNewProjectContext.Provider value={{
            isOpen,
            openModal,
            closeModal,
        }}>
            {children}
        </AddNewProjectContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAddNewProjectContext = () => React.useContext(AddNewProjectContext);