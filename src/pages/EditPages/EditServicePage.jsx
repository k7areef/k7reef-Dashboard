import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GET_SERVICE } from "@utils/apis";
import { useParams } from "react-router-dom";
import EditService from "@components/services/EditService";

function EditServicePage() {

    const { serviceId } = useParams();

    const { data: service, isLoading } = useQuery({ // Fetch service
        queryKey: ['service', serviceId],
        queryFn: () => GET_SERVICE(serviceId).then(res => res.data),
        enabled: true,
        refetchOnWindowFocus: false
    });

    return (
        <div className="edit-service-page">
            <EditService isLoading={isLoading} service={service} />
        </div>
    )
}

export default EditServicePage;