/**
 * @typedef {Object} UpdateProjectProps
 * @prop {Object} project
 * @prop {boolean} isLoading
 */

import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useDeleteConfirmationContext } from "@contexts/DeleteConfirmationContext";
import { DELETE_PROJECT, GET_PROJECT, UPDATE_PROJECT } from "@utils/apis";
import SectionWrapper from "@components/sections/SectionWrapper";
import Status from "@components/UI/Status";

/**
 * @param {UpdateProjectProps} props
 */

// Form validation
const validationSchema = Yup.object({
    title: Yup.string(),
    demo_url: Yup.string().url("Invalid URL"),
    github_repo: Yup.string().url("Invalid URL"),
    thumbnail_url: Yup.string().url("Invalid URL"),
    description: Yup.string(),
    status: Yup.string().oneOf(["Active", "Inprogress", "Incoming", "Archived"], "Status is required"),
});
// Form fields
const fields = [
    {
        id: "thumbnail_url",
        type: "text",
        name: "thumbnail_url",
        placeholder: "Enter Project Thumbnail Url",
        label: "Project Thumbnail",
        typeField: "input"
    },
    {
        id: "title",
        type: "text",
        name: "title",
        placeholder: "Enter Project Title",
        label: "Project Title",
        typeField: "input",
        parentClassName: "sm:col-span-2"
    },
    {
        id: "demo_url",
        type: "text",
        name: "demo_url",
        placeholder: "Enter Demo Link",
        label: "Demo Link",
        typeField: "input"
    },
    {
        id: "github_repo",
        type: "text",
        name: "github_repo",
        placeholder: "Enter Github Repo Link",
        label: "Github Repo Link",
        typeField: "input"
    },
    {
        id: "description",
        type: "text",
        name: "description",
        placeholder: "Enter Project Description",
        typeField: "textarea",
        label: "Description",
        parentClassName: "sm:col-span-2"
    }
];

function EditProject({ isLoading, project }) {

    // Hooks:
    const { openModal } = useDeleteConfirmationContext();
    const { projectId } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Memo:
    const initialValues = React.useMemo(() => { // Set initial values
        if (!project || isLoading) return {};
        return (
            {
                thumbnail_url: project.thumbnail_url,
                title: project.title,
                description: project.description,
                status: project.status,
                demo_url: project.demo_url,
                github_repo: project.github_repo
            }
        )
    }, [isLoading, project]);

    // Handlers:
    const handleSubmit = React.useCallback(async (values, actions) => { // Update project
        const { setSubmitting, resetForm } = actions;
        setSubmitting(true);

        try {
            const { data, error, status } = await UPDATE_PROJECT(projectId, values);

            if (error) { // Throw error
                console.log(error);
                throw new Error(error.message);
            } else if (data && status === 200) {
                queryClient.setQueryData(['project', projectId], () => data);
                queryClient.invalidateQueries({ queryKey: ['project', projectId] });
                resetForm();
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    }, [projectId, queryClient]);
    const handleDelete = React.useCallback(() => { // Delete project
        openModal({
            title: "Delete Project?",
            description: "Are you sure you want to delete this project?",
            onDelete: async () => {
                try {
                    const { data, error, status } = await DELETE_PROJECT(projectId);
                    if (error) { // Check for errors
                        console.log(error);
                        throw error;
                    } else if (data && status === 200) {
                        queryClient.setQueryData(["projects"], (prev) => prev.filter((projectItem) => projectItem.id !== projectId));
                    }
                } catch (err) {
                    console.log(err);
                } finally {
                    navigate("/dashboard/projects");
                }
            }
        });
    }, [navigate, openModal, projectId, queryClient]);

    return (
        <SectionWrapper
            title="Edit Your Project"
            buttonTexts={{
                update: "Update Project",
                delete: "Delete Project",
                discard: "Discard Changes",
                submit: "Update Project"
            }}
            fields={fields}
            handlers={{
                handleSubmit,
                handleDelete
            }}
            initialValues={initialValues}
            isLoading={isLoading}
            validationSchema={validationSchema}
        >
            <Status />
        </SectionWrapper>
    )
}

export default EditProject;