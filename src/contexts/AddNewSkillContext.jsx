import React from 'react'
import { useLocation } from 'react-router-dom';

const AddNewSkillContext = React.createContext();

export const AddNewSkillProvider = ({ children }) => {

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
        <AddNewSkillContext.Provider value={{
            isOpen,
            openModal,
            closeModal,
        }}>
            {children}
        </AddNewSkillContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAddNewSkillContext = () => React.useContext(AddNewSkillContext);