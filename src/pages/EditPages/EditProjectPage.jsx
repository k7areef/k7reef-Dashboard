import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { GET_PROJECT, UPDATE_PROJECT } from "@utils/apis";
import EditProject from "@components/projects/EditProject";

function EditProjectPage() {

    const { projectId } = useParams();

    const { data: project, isLoading } = useQuery({ // Fetch project
        queryKey: ['project', projectId],
        queryFn: () => GET_PROJECT(projectId).then(res => res.data),
        enabled: true,
        refetchOnWindowFocus: false
    });

    return (
        <div className="edit-project-page">
            <EditProject project={project} isLoading={isLoading} />
        </div >
    )
}

export default EditProjectPage;