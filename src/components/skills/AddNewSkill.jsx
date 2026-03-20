import React from "react";
import SectionWrapper from "@components/sections/SectionWrapper";
import Status from "@components/UI/Status";
import { useAddNewSkillContext } from "@contexts/AddNewSkillContext";
import { useQueryClient } from "@tanstack/react-query";
import { CREATE_SKILL } from "@utils/apis";
import * as Yup from "yup";
import toast from "react-hot-toast";

// Initial values
const initialValues = {
    name: "",
    level: 50,
    image_url: "",
    status: "Active",
}
// Form validation
const validationSchema = Yup.object({
    name: Yup.string().required("Skill name is required"),
    level: Yup.number().min(0, "Skill level must be between 0 and 100").max(100, "Skill level must be between 0 and 100").required("Skill level is required"),
    image_url: Yup.string().url("Invalid URL").required("Image URL is required"),
    status: Yup.string().oneOf(["Active", "Inprogress", "Incoming", "Archived"], "Status is required"),
});
// Form fields
const fields = [
    {
        id: "image_url",
        type: "text",
        name: "image_url",
        autoComplete: "on",
        placeholder: "Enter Skill Image Url",
        label: "Image Url",
        typeField: "input"
    },
    {
        id: "name",
        type: "text",
        name: "name",
        autoComplete: "off",
        placeholder: "Enter Skill Name",
        label: "Skill Name",
        typeField: "input"
    },
    {
        id: "level",
        type: "number",
        name: "level",
        min: 0,
        max: 100,
        minLength: 1,
        maxLength: 3,
        placeholder: "Enter Skill Level",
        label: "Skill Level",
        typeField: "input"
    },
];

function AddNewSkill() {

    // Hooks:
    const { closeModal } = useAddNewSkillContext();
    const queryClient = useQueryClient();

    // Handlers:
    const handleSubmit = React.useCallback(async (values, actions) => { // Create
        const { setSubmitting, resetForm } = actions;
        setSubmitting(true);
        try {
            const { data, error, status } = await CREATE_SKILL(values);
            toast.dismiss("skill-created");
            if (error) {
                console.log(error);
                toast.error(error.message, {
                    className: "toast-style",
                    id: "skill-created"
                });
                throw new Error(error.message);
            } else if (data && status === 201) {
                queryClient.setQueryData(["skills"], (prev) => [data, ...prev]);
                resetForm();
                closeModal();
                toast.success("Skill Created Successfully", {
                    className: "toast-style",
                    id: "skill-created"
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
            title="Edit Your Skill"
            buttonTexts={{
                update: "Create New Skill",
                cancel: "Cancel",
                discard: "Discard Changes",
                submit: "Create New Skill"
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

export default AddNewSkill;