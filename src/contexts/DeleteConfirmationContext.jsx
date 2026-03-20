import Button from "@components/UI/Button";
import LoadingSpinner from "@components/UI/LoadingSpinner";
import { faTrashCan, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useLocation } from "react-router-dom";

const DeleteConfirmationContext = React.createContext();

export const DeleteConfirmationProvider = ({ children }) => {

    // Hooks:
    const { pathname } = useLocation();

    // States:
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState({
        title: "",
        description: "",
        onDelete: async () => { }
    });

    // Effect:
    React.useEffect(() => { // Close modal on route change
        setIsOpen(false);
    }, [pathname]);

    // Handlers:
    const openModal = React.useCallback((dataPayload) => {
        setData(dataPayload);
        setIsOpen(true);
    }, []);
    const closeModal = React.useCallback(() => {
        setData({});
        setIsOpen(false);
    }, []);
    const handleDelete = React.useCallback(async () => { // Delete
        setIsLoading(true);
        data.onDelete(data.id).finally(() => {
            setIsLoading(false);
            setData({});
            closeModal();
        });
    }, [closeModal, data]);

    // Memo:
    const childrens = React.useMemo(() => { // Modal Childrens
        return (
            <div
                onClick={e => e.stopPropagation()}
                className='modal-childrens text-center bg-card-bg p-5 rounded-lg border-2 border-accent-soft md:max-w-130 md:mx-auto space-y-3'
            >
                {/* Icons */}
                <div className="logout-icon w-12 h-12 rounded-full flex items-center justify-center mx-auto border-2 border-red-500 text-red-500">
                    <FontAwesomeIcon icon={faWarning} />
                </div>
                {/* Text */}
                <div className="text">
                    <h3 className='mb-1 font-semibold text-lg md:text-xl text-white'>{data.title}</h3>
                    <p className='text-muted-text font-medium'>{data.description}</p>
                </div>
                {/* Actions */}
                <div className="actions flex items-center gap-3 *:w-full">
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
                        variant='danger'
                        title="Delete"
                        aria-label="Delete"
                        disabled={isLoading}
                        onClick={handleDelete}
                        className='flex items-center gap-2 justify-center'
                    >
                        {
                            isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <FontAwesomeIcon icon={faTrashCan} />
                            )
                        }
                        <span>Delete</span>
                    </Button>
                </div>
            </div>
        )
    }, [closeModal, data, handleDelete, isLoading]);

    return (
        <DeleteConfirmationContext.Provider
            value={{
                isOpen,
                openModal,
                closeModal,
                childrens
            }}
        >
            {children}
        </DeleteConfirmationContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDeleteConfirmationContext = () => React.useContext(DeleteConfirmationContext);