import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "@contexts/AuthContext";
import LoadingSpinner from "@components/UI/LoadingSpinner";
// Layouts:
import AuthLayout from "@layouts/AuthLayout";
import MainLayout from "@layouts/MainLayout";
// Pages:
import LoginPage from "@pages/LoginPage";
import ProjectsPage from "@pages/ProjectsPage";
import SkillsPage from "@pages/SkillsPage";
import ServicesPage from "@pages/ServicesPage";
import EditProjectPage from "@pages/EditPages/EditProjectPage";
import EditSkillPage from "@pages/EditPages/EditSkillPage";
import EditServicePage from "@pages/EditPages/EditServicePage";
import ProfilePage from "@pages/ProfilePage";

function App() {

  const { isLoading, isAuth } = useAuthContext();

  return (
    <div className="App bg-dark-bg text-white">
      {
        isLoading ? (
          <div className="h-screen flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <React.Fragment>
            {/* Routes */}
            <Routes>
              {/* Default route */}
              <Route path="/" element={<Navigate to={isAuth ? '/dashboard' : '/auth'} replace />} />
              {/* Public routes */}
              <Route path="/auth" element={<AuthLayout />}>
                <Route index element={<Navigate to={'login'} replace />} />
                <Route path="login" element={<LoginPage />} />
              </Route>
              {/* Protected routes */}
              <Route path="/dashboard" element={<MainLayout />}>
                <Route index element={<Navigate to={'projects'} replace />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/edit/:projectId" element={<EditProjectPage />} />
                <Route path="skills" element={<SkillsPage />} />
                <Route path="skills/edit/:skillId" element={<EditSkillPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="services/edit/:serviceId" element={<EditServicePage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </React.Fragment>
        )
      }
    </div>
  )
}

export default App;