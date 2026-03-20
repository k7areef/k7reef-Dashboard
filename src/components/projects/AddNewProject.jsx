import React from "react";
import SectionWrapper from "@components/sections/SectionWrapper";
import Status from "@components/UI/Status";
import { useAddNewProjectContext } from "@contexts/AddNewProjectContext";
import { useQueryClient } from "@tanstack/react-query";
import { CREATE_PROJECT } from "@utils/apis";
import * as Yup from "yup";
import toast from "react-hot-toast";

// Initial values
const initialValues = {
    title: "",
    demo_url: "",
    github_repo: "",
    thumbnail_url: "",
    description: "",
    status: "Active",
}
// Form validation
const validationSchema = Yup.object({
    title: Yup.string().required("Project title is required"),
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
        autoComplete: "on",
        placeholder: "Enter Thumbnail Url",
        label: "Thumbnail Url",
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

function AddNewProject() {

    // Hooks:
    const { closeModal } = useAddNewProjectContext();
    const queryClient = useQueryClient();

    // Handlers:
    const handleSubmit = React.useCallback(async (values, actions) => { // Create
        const { setSubmitting, resetForm } = actions;
        setSubmitting(true);
        try {
            const { data, error, status } = await CREATE_PROJECT(values);
            toast.dismiss("project-created");
            if (error) {
                console.log(error);
                toast.error(error.message, {
                    className: "toast-style",
                    id: "skill-created"
                });
                throw new Error(error.message);
            } else if (data && status === 201) {
                queryClient.setQueryData(["projects"], (prev) => [data, ...prev]);
                resetForm();
                closeModal();
                toast.success("Project Created Successfully", {
                    className: "toast-style",
                    id: "project-created"
                });
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    }, [closeModal, queryClient]);

    return (
        <SectionWrapper
            type="add"
            title="Edit Your Project"
            buttonTexts={{
                update: "Create New Project",
                cancel: "Cancel",
                discard: "Discard Changes",
                submit: "Create New Project"
            }}
            fields={fields}
            handlers={{
                handleSubmit,
                handleCancel: closeModal
            }}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            <Status />
        </SectionWrapper>
    )
}

export default AddNewProject;