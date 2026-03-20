/**
 * @typedef {Object} ProjectCardProps
 * @prop {Object} project
 */

import Badge from "@components/UI/Badge";
import { useDeleteConfirmationContext } from "@contexts/DeleteConfirmationContext";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@utils/supabaseClient";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

/**
 * @param {ProjectCardProps} props
 */

function ProjectCard({ project }) {

    const { openModal } = useDeleteConfirmationContext();
    const queryClient = useQueryClient();

    const normalProjectStatus = String(project.status).toLowerCase();

    const handleDelete = React.useCallback(() => { // Delete
        openModal({
            title: "Delete Project?",
            description: "Are you sure you want to delete this project?",
            onDelete: async () => {
                try {
                    // Delete skill
                    const { data, error, status } = await supabase
                        .from("projects")
                        .delete()
                        .eq("id", project.id)
                        .select("*")
                        .single();

                    if (error) { // Check for errors
                        console.log(error);
                        throw error;
                    } else if (data && status === 200) {
                        queryClient.setQueryData(["projects"], (prev) => prev.filter((projectItem) => projectItem.id !== project.id));
                        toast.dismiss("project-deleted");
                        toast.success("Project Deleted Successfully", {
                            className: "toast-style",
                            id: "project-deleted"
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        })
    }, [project.id, queryClient, openModal]);

    return (
        <div className="project-card bg-card-bg p-3 md:p-5 rounded-lg flex flex-col gap-5">
            {/* Thumbnail */}
            <div className="project-thumbnail aspect-video rounded-md overflow-hidden">
                {
                    project.thumbnail_url ? (

                        <img
                            src={project.thumbnail_url}
                            alt={project.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full bg-accent-soft">
                            <FontAwesomeIcon icon={faProjectDiagram} className="text-3xl text-primary" />
                        </div>
                    )
                }
            </div>
            {/* Info */}
            <div className="text-info">
                {/* Header */}
                <div className="card-header flex items-center gap-3 justify-between mb-3">
                    {/* Title */}
                    <h3 className="font-semibold sm:text-lg md:text-xl">{project.title}</h3>
                    {/* Status */}
                    <div className="project-satatus">
                        <Badge text={project.status} variant={normalProjectStatus === "inprogress" ? "warning" : (normalProjectStatus === "archived" || normalProjectStatus === "incoming") ? "dark" : "success"} />
                    </div>
                </div>
                <p className="text-muted-text line-clamp-3">{project.description}</p>
            </div>
            {/* Techs */}
            <div className="project-techs flex items-center gap-3 flex-wrap">
                {
                    project.techs.map((tech, index) => (<div className="project-tech py-1 px-2 text-sm text-nowrap bg-accent-soft rounded-md border-2 border-primary/30" key={tech.id || index}>
                        {tech.skills.name}
                    </div>))
                }
            </div>
            {/* Separator */}
            <hr className="border-t-accent-soft mt-auto" />
            {/* Card Footer */}
            <div className="card-footer flex items-center justify-between gap-3">
                {/* Links */}
                <div className="projects-links flex items-center gap-1">
                    {/* Demo */}
                    <a
                        href={project.demo_url}
                        title={project.title}
                        aria-label={project.title}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xl text-muted-text w-10 h-10 rounded-full sm:hover:bg-accent-soft transition flex items-center justify-center"
                    >
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                        <span className="sr-only">Demo</span>
                    </a>
                    {/* Github */}
                    <a
                        href={project.github_repo}
                        title={project.title}
                        aria-label={project.title}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xl text-muted-text w-10 h-10 rounded-full sm:hover:bg-accent-soft transition flex items-center justify-center"
                    >
                        <FontAwesomeIcon icon={faGithub} />
                        <span className="sr-only">Github</span>
                    </a>
                </div>
                {/* Delete */}
                <button
                    type="button"
                    title="delete"
                    aria-label="delete"
                    onClick={handleDelete}
                    className="text-danger ms-auto underline font-medium sm:hover:text-danger/80"
                >
                    Delete
                </button>
                {/* Edit */}
                <Link
                    to={`/dashboard/projects/edit/${project.id}`}
                    title="Edit"
                    aria-label="Edit"
                    className="underline font-medium text-primary sm:hover:text-primary/80"
                >
                    Edit Project
                </Link>
            </div>
        </div>
    )
}

export default ProjectCard;