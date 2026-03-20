/**
 * @typedef {Object} SkillCardProps
 * @prop {Object} skill
 */

import Badge from "@components/UI/Badge";
import { useDeleteConfirmationContext } from "@contexts/DeleteConfirmationContext";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import { DELETE_SKILL } from "@utils/apis";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

/**
 * @param {SkillCardProps} props
 */

function SkillCard({ skill }) {

    const { openModal } = useDeleteConfirmationContext();
    const queryClient = useQueryClient();

    const normalSkillStatus = String(skill.status || "active").toLowerCase();

    const handleDelete = React.useCallback(() => { // Delete
        openModal({
            title: "Delete Skill?",
            description: "Are you sure you want to delete this skill?",
            onDelete: async () => {
                try {
                    // Delete skill
                    const { data, error, status } = await DELETE_SKILL(skill.id);

                    if (error) { // Check for errors
                        console.log(error);
                        throw error;
                    } else if (data && status === 200) {
                        queryClient.setQueryData(["skills"], (prev) => prev.filter((skillItem) => skillItem.id !== skill.id));
                        toast.dismiss("skill-deleted");
                        toast.success("Skill Deleted Successfully", {
                            className: "toast-style",
                            id: "skill-deleted"
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        })
    }, [skill.id, queryClient, openModal]);

    return (
        <div className="skill-card bg-card-bg border-2 border-accent-soft p-3 xl:p-5 rounded-lg space-y-5">
            {/* Info */}
            <div className="info-wrapper flex items-center justify-between">
                {/* Info */}
                <div className="skill-info flex items-center gap-2 w-full">
                    {/* Image */}
                    {
                        String(skill.name || "").toLowerCase() === "github" ? (
                            <FontAwesomeIcon icon={faGithub} size="2x" />
                        ) : (
                            <img
                                src={skill.image_url}
                                alt={skill.name}
                                width={30}
                            />
                        )
                    }
                    {/* Name */}
                    <h3 className="skill-name sm:text-lg md:text-xl font-semibold line-clamp-1">{skill.name}</h3>
                </div>
                {/* Status */}
                <Badge
                    className="w-fit"
                    text={skill.status}
                    variant={normalSkillStatus === "active" ? "success" : normalSkillStatus === "inprogress" ? "warning" : normalSkillStatus === "incoming" ? "dark" : "warning"}
                />
            </div>
            {/* Level */}
            <div className="skill-level space-y-2">
                <div className="flex items-center justify-between font-semibold">
                    <span className="text-muted-text">Level</span>
                    <span className="text-primary">{skill.level}%</span>
                </div>
                <div className="level-bar bg-dark-bg h-2 rounded-full overflow-hidden">
                    <div className="bar h-full bg-primary" style={{ width: `${skill.level}%` }}></div>
                </div>
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
                    to={`/dashboard/skills/edit/${skill.id}`}
                    className="underline text-primary font-medium shrink-0 sm:hover:text-primary/80 block w-fit"
                >
                    Edit Skill
                </Link>
            </div>
        </div>
    )
}

export default SkillCard;