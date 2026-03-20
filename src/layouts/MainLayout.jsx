import { LogoutConfirmationContextProvider } from "@contexts/LogoutConfirmationContext";
import MainLayoutWrapper from "./wrappers/MainLayoutWrapper";
import { DeleteConfirmationProvider } from "@contexts/DeleteConfirmationContext";
import { AddNewProjectProvider } from "@contexts/AddNewProjectContext";
import { AddNewSkillProvider } from "@contexts/AddNewSkillContext";
import { AddNewServiceProvider } from "@contexts/AddNewServieContext";

function MainLayout() {
    return (
        <LogoutConfirmationContextProvider>
            <DeleteConfirmationProvider>
                <AddNewProjectProvider>
                    <AddNewSkillProvider>
                        <AddNewServiceProvider>
                            <MainLayoutWrapper />
                        </AddNewServiceProvider>
                    </AddNewSkillProvider>
                </AddNewProjectProvider>
            </DeleteConfirmationProvider>
        </LogoutConfirmationContextProvider>
    )
}

export default MainLayout;