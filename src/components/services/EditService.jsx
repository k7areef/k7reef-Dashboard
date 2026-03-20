/**
 * @typedef {Object} UpdateServiceProps
 * @prop {Object} service
 * @prop {boolean} isLoading
 */

import React from "react";
import SectionWrapper from "@components/sections/SectionWrapper";
import { useDeleteConfirmationContext } from "@contexts/DeleteConfirmationContext";
import { useQueryClient } from "@tanstack/react-query";
import { DELETE_SERVICE, UPDATE_SERVICE } from "@utils/apis";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

/**
 * @param {UpdateServiceProps} props
 */

// Form validation
const validationSchema = Yup.object({
    image_url: Yup.string().url("Invalid URL"),
    name: Yup.string().required("Service name is required"),
    description: Yup.string(),
});
// Form fields
const fields = [
    {
        id: "image_url",
        type: "text",
        name: "image_url",
        autoComplete: "on",
        placeholder: "Enter Service Image Url",
        label: "Image Url",
        typeField: "input"
    },
    {
        id: "name",
        type: "text",
        name: "name",
        autoComplete: "off",
        placeholder: "Enter Service Name",
        label: "Service Name",
        typeField: "input"
    },
    {
        id: "description",
        type: "text",
        name: "description",
        autoComplete: "off",
        placeholder: "Enter Service Description",
        label: "Service Description",
        typeField: "textarea",
        parentClassName: "md:col-span-2"
    },
];

function EditService({ isLoading, service }) {

    // Hooks:
    const { openModal } = useDeleteConfirmationContext();
    const { serviceId } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Memo:
    const initialValues = React.useMemo(() => { // Set initial values
        if (!service || isLoading) return {};
        return (
            {
                image_url: service.image_url || "",
                name: service.name,
                description: service.description,
            }
        )
    }, [isLoading, service]);

    // Handlers:
    const handleSubmit = React.useCallback(async (values, actions) => { // Update service
        const { setSubmitting, resetForm } = actions;
        setSubmitting(true);

        try {
            const { data, error, status } = await UPDATE_SERVICE(serviceId, values);
            if (error) { // Throw error
                console.log(error);
                throw new Error(error.message);
            } else if (data && status === 200) {
                queryClient.setQueryData(['service', serviceId], () => data);
                queryClient.invalidateQueries({ queryKey: ['service', serviceId] });
                resetForm();
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    }, [serviceId, queryClient]);
    const handleDelete = React.useCallback(() => { // Delete service
        openModal({
            title: "Delete Service?",
            description: "Are you sure you want to delete this service?",
            onDelete: async () => {
                try {
                    const { data, error, status } = await DELETE_SERVICE(serviceId);

                    if (error) { // Check for errors
                        console.log(error);
                        throw error;
                    } else if (data && status === 200) {
                        queryClient.setQueryData(["services"], (prev) => prev.filter((serviceItem) => serviceItem.id !== serviceId));
                    }
                } catch (err) {
                    console.log(err);
                } finally {
                    navigate("/dashboard/services");
                }
            }
        });
    }, [navigate, openModal, serviceId, queryClient]);

    return (
        <SectionWrapper
            title="Edit Your Service"
            buttonTexts={{
                update: "Update Service",
                delete: "Delete Service",
                discard: "Discard Changes",
                submit: "Update Service"
            }}
            fields={fields}
            handlers={{
                handleSubmit,
                handleDelete
            }}
            initialValues={initialValues}
            isLoading={isLoading}
            validationSchema={validationSchema}
        />
    )
}

export default EditService;