/**
 * @typedef {Object} UpdateSkillProps
 * @prop {Object} skill
 * @prop {boolean} isLoading
 */

import React from "react";
import { useDeleteConfirmationContext } from "@contexts/DeleteConfirmationContext";
import { useQueryClient } from "@tanstack/react-query";
import { DELETE_SKILL, UPDATE_SKILL } from "@utils/apis";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import SectionWrapper from "../sections/SectionWrapper";
import Status from "@components/UI/Status";

/**
 * @param {UpdateSkillProps} props
 */

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

function EditSkill({ isLoading, skill }) {

    // Hooks:
    const { openModal } = useDeleteConfirmationContext();
    const { skillId } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Memo:
    const initialValues = React.useMemo(() => { // Set initial values
        if (!skill || isLoading) return {};
        return (
            {
                name: skill.name,
                level: skill.level,
                image_url: skill.image_url,
                status: skill.status,
            }
        )
    }, [isLoading, skill]);

    // Handlers:
    const handleSubmit = React.useCallback(async (values, actions) => { // Update skill
        const { setSubmitting, resetForm } = actions;
        setSubmitting(true);

        try {
            const { data, error, status } = await UPDATE_SKILL(skillId, values);
            if (error) { // Throw error
                console.log(error);
                throw new Error(error.message);
            } else if (data && status === 200) {
                queryClient.setQueryData(['skill', skillId], () => data);
                queryClient.invalidateQueries({ queryKey: ['skill', skillId] });
                resetForm();
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    }, [skillId, queryClient]);
    const handleDelete = React.useCallback(() => { // Delete skill
        openModal({
            title: "Delete Skill?",
            description: "Are you sure you want to delete this skill?",
            onDelete: async () => {
                try {
                    const { data, error, status } = await DELETE_SKILL(skillId);

                    if (error) { // Check for errors
                        console.log(error);
                        throw error;
                    } else if (data && status === 200) {
                        queryClient.setQueryData(["skills"], (prev) => prev.filter((skillItem) => skillItem.id !== skillId));
                    }
                } catch (err) {
                    console.log(err);
                } finally {
                    navigate("/dashboard/skills");
                }
            }
        });
    }, [navigate, openModal, skillId, queryClient]);

    return (
        <SectionWrapper
            title="Edit Your Skill"
            buttonTexts={{
                update: "Update Skill",
                delete: "Delete Skill",
                discard: "Discard Changes",
                submit: "Update Skill"
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

export default EditSkill;