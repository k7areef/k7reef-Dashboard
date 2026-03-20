import AddNewService from "@components/services/AddNewService";
import ServicesGrid from "@components/services/ServicesGrid";
import ModalBase from "@components/UI/ModalBase";
import { useAddNewServiceContext } from "@contexts/AddNewServieContext";
import { useQuery } from "@tanstack/react-query";
import { GET_SERVICES } from "@utils/apis";

function ServicesPage() {

    const { isOpen, closeModal } = useAddNewServiceContext();

    const { data: services, isLoading } = useQuery({
        queryKey: [`services`],
        queryFn: () => GET_SERVICES().then(res => res.data),
        enabled: true,
        refetchOnWindowFocus: false
    });

    console.log(isLoading ? "Loading..." : services ? services : "No Services");

    return (
        <div className="services-page">
            {
                isLoading ? (
                    <>Loading...</>
                ) : (
                    <ServicesGrid services={services} />
                )
            }
            {/* Add New Service Modal */}
            <ModalBase isOpen={isOpen} closeModal={closeModal}>
                <AddNewService />
            </ModalBase>
        </div>
    )
}

export default ServicesPage;