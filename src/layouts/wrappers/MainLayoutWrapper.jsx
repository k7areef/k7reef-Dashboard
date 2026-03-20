import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
import Sidebar from '@components/layout/Sidebar';
import ModalBase from '@components/UI/ModalBase';
import { useAuthContext } from '@contexts/AuthContext';
import { useDeleteConfirmationContext } from '@contexts/DeleteConfirmationContext';
import { useLogoutConfirmationContext } from '@contexts/LogoutConfirmationContext';
import { Navigate, Outlet } from 'react-router-dom';

function MainLayoutWrapper() {

    // Contexts:
    const { // Logout confirmation
        isOpen: isLogoutConfirmationOpen,
        childrens: logoutConfirmationChildren,
        closeModal: logoutConfirmationCloseModal
    } = useLogoutConfirmationContext();
    const { // Delete confirmation
        isOpen: isDeleteConfirmationOpen,
        childrens: deleteConfirmationChildren,
        closeModal: deleteConfirmationCloseModal
    } = useDeleteConfirmationContext();

    const { isAuth } = useAuthContext();

    // Redirect to login if not authenticated
    if (!isAuth) return <Navigate to="/auth" replace />

    return (
        <div className="main-layout h-screen flex">
            {/* Sidebar */}
            <Sidebar />
            {/* Main */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <Header />
                {/* Main Content */}
                <div className="main-content overflow-y-auto p-3 md:p-5 flex-1">
                    <Outlet />
                </div>
                {/* Footer */}
                <Footer />
            </main>
            {/* Logout Confirmation */}
            <ModalBase isOpen={isLogoutConfirmationOpen} closeModal={logoutConfirmationCloseModal}>
                {logoutConfirmationChildren}
            </ModalBase>
            {/* Delete Confirmation */}
            <ModalBase isOpen={isDeleteConfirmationOpen} closeModal={deleteConfirmationCloseModal}>
                {deleteConfirmationChildren}
            </ModalBase>
        </div>
    )
}

export default MainLayoutWrapper;