/**
 * @typedef {Object} ServiceCardProps
 * @prop {Object} service
 */

import { useDeleteConfirmationContext } from "@contexts/DeleteConfirmationContext";
import { useQueryClient } from "@tanstack/react-query";
import { DELETE_SERVICE } from "@utils/apis";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

/**
 * @param {ServiceCardProps} props
 */

function ServiceCard({ service }) {

    const { openModal } = useDeleteConfirmationContext();
    const queryClient = useQueryClient();

    const handleDelete = React.useCallback(() => { // Delete
        openModal({
            title: "Delete Service?",
            description: "Are you sure you want to delete this service?",
            onDelete: async () => {
                try {
                    // Delete skill
                    const { data, status } = await DELETE_SERVICE(service.id);
                    if (data && status === 200) {
                        queryClient.setQueryData(["services"], (prev) => prev.filter((serviceItem) => serviceItem.id !== service.id));
                        toast.dismiss("service-deleted");
                        toast.success("Service Deleted Successfully", {
                            className: "toast-style",
                            id: "service-deleted"
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        })
    }, [openModal, queryClient, service.id]);

    return (
        <div className="service-card bg-card-bg border-2 border-accent-soft p-3 lg:p-5 rounded-lg space-y-5">
            {/* Info */}
            <div className="text-info">
                <h3 className="font-semibold sm:text-lg md:text-xl mb-1">{service.name}</h3>
                <p className="text-muted-text line-clamp-3">{service.description}</p>
            </div>
            {/* Separator */}
            <hr className="border-accent-soft" />
            {/* Actions */}
            <div className="actions flex items-center justify-end gap-3">
                {/* Delete */}
                <button
                    type="button"
                    title="delete"
                    aria-label="delete"
                    onClick={handleDelete}
                    className="text-danger underline font-medium sm:hover:text-danger/80"
                >
                    Delete
                </button>
                {/* Edit */}
                <Link
                    to={`/dashboard/services/edit/${service.id}`}
                    className="underline text-primary font-medium shrink-0 sm:hover:text-primary/80 block w-fit"
                >
                    Edit Service
                </Link>
            </div>
        </div>
    )
}

export default ServiceCard;