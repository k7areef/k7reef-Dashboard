/**
 * @typedef {Object} ProjectsProps
 * @prop {Array} projects
 */

import SectionHeader from "../sections/components/SectionHeader";
import Button from "@components/UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAddNewProjectContext } from "@contexts/AddNewProjectContext";
import FilterSection from "@components/sections/FilterSection";
import ProjectCard from "./ProjectCard";

/**
 * @param {ProjectsProps} props
 */

function ProjectsGrid({ projects }) {

    const { openModal } = useAddNewProjectContext();

    return (
        <section className="projects-section" id="projects">
            {/* Header */}
            <SectionHeader
                title="Projects"
                description="These are some of my personal projects."
            >
                <Button
                    onClick={openModal}
                    className="flex items-center gap-2"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Add New Project</span>
                </Button>
            </SectionHeader>
            {/* Projects Filter */}
            <FilterSection className="mb-5">
                Projects Filter
            </FilterSection>
            {/* Projects */}
            <div className="projects-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {
                    projects.map((project, index) => (<ProjectCard project={project} key={project.id || index} />))
                }
            </div>
        </section>
    )
}

export default ProjectsGrid