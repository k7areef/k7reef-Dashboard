import React from "react";
import { useAddNewServiceContext } from "@contexts/AddNewServieContext";
import { useQueryClient } from "@tanstack/react-query";
import { CREATE_SERVICE } from "@utils/apis";
import * as Yup from "yup";
import SectionWrapper from "@components/sections/SectionWrapper";
import toast from "react-hot-toast";

// Initial values
const initialValues = {
    name: "",
    description: "",
    image_url: "",
}
// Form validation
const validationSchema = Yup.object({
    name: Yup.string().required("Skill name is required"),
    description: Yup.string().required("Description is required"),
    image_url: Yup.string().url("Invalid URL"),
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

function AddNewService() {

    // Hooks:
    const { closeModal } = useAddNewServiceContext();
    const queryClient = useQueryClient();

    // Handlers:
    const handleSubmit = React.useCallback(async (values, actions) => { // Create
        const { setSubmitting, resetForm } = actions;
        setSubmitting(true);
        try {
            const { data, error, status } = await CREATE_SERVICE(values);
            toast.dismiss("serivce-created");
            if (error) {
                console.log(error);
                toast.error(error.message, {
                    className: "toast-style",
                    id: "serivce-created"
                });
                throw new Error(error.message);
            } else if (data && status === 201) {
                queryClient.setQueryData(["services"], (prev) => [data, ...prev]);
                resetForm();
                closeModal();
                toast.dismiss("service-created");
                toast.success("Service Created Successfully", {
                    className: "toast-style",
                    id: "service-created"
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
            title="Edit Your Service"
            buttonTexts={{
                update: "Create New Service",
                cancel: "Cancel",
                discard: "Discard Changes",
                submit: "Create New Service"
            }}
            fields={fields}
            handlers={{
                handleSubmit,
                handleCancel: closeModal
            }}
            initialValues={initialValues}
            validationSchema={validationSchema}
        />
    )
}

export default AddNewService;