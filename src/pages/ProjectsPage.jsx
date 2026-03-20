import AddNewProject from "@components/projects/AddNewProject";
import ProjectsGrid from "@components/projects/ProjectsGrid";
import ModalBase from "@components/UI/ModalBase";
import { useAddNewProjectContext } from "@contexts/AddNewProjectContext";
import { useQuery } from "@tanstack/react-query";
import { GET_PROJECTS } from "@utils/apis";

function ProjectsPage() {

    const { isOpen, closeModal } = useAddNewProjectContext();

    const { data: projects, isLoading } = useQuery({
        queryKey: [`projects`],
        queryFn: () => GET_PROJECTS().then(res => res.data),
        enabled: true,
        refetchOnWindowFocus: false
    });

    return (
        <div className="projects-page">
            {
                isLoading ? (
                    <>Loading...</>
                ) : (
                    <ProjectsGrid projects={projects} />
                )
            }
            {/* Add New Project Modal */}
            <ModalBase isOpen={isOpen} closeModal={closeModal}>
                <AddNewProject />
            </ModalBase>
        </div>
    )
}

export default ProjectsPage;