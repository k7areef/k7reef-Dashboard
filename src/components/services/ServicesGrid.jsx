/**
 * @typedef {Object} ServicesProps
 * @prop {Array} services
 */

import Button from "@components/UI/Button";
import SectionHeader from "../sections/components/SectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ServiceCard from "@components/services/ServiceCard";
import { useAddNewServiceContext } from "@contexts/AddNewServieContext";
import FilterSection from "@components/sections/FilterSection";

/**
 * @param {ServicesProps} props
 */

function ServicesGrid({ services }) {

    const { openModal } = useAddNewServiceContext();

    return (
        <section className="services-section" id="services">
            {/* Header */}
            <SectionHeader
                title="Services"
                description="These are some of my services."
            >
                <Button
                    onClick={openModal}
                    className="flex items-center gap-2"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Add New Service</span>
                </Button>
            </SectionHeader>
            {/* Services Filter */}
            <FilterSection className="mb-5">
                Services Filter
            </FilterSection>
            {/* Services */}
            <div className="services-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {
                    services.map((service, index) => (<ServiceCard service={service} key={service.id || index} />))
                }
            </div>
        </section>
    )
}

export default ServicesGrid;