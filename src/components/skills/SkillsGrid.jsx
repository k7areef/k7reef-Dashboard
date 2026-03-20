/**
 * @typedef {Object} SkillsProps
 * @prop {Array} skills
 */

import SkillCard from "@components/skills/SkillCard";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionHeader from "../sections/components/SectionHeader";
import Button from "@components/UI/Button";
import { useAddNewSkillContext } from "@contexts/AddNewSkillContext";
import FilterSection from "@components/sections/FilterSection";

/**
 * @param {SkillsProps} props
 */

function SkillsGrid({ skills }) {

    const { openModal } = useAddNewSkillContext();

    return (
        <section className="skills-section" id="skills">
            {/* Header */}
            <SectionHeader
                title="Skills"
                description="These are some of my skills."
            >
                <Button
                    onClick={openModal}
                    className="flex items-center gap-2"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Add New Skill</span>
                </Button>
            </SectionHeader>
            {/* Skills Filter */}
            <FilterSection className="mb-5">
                Skills Filter
            </FilterSection>
            {/* Skills */}
            <div className="skills-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {
                    skills.map((skill, index) => (<SkillCard skill={skill} key={skill.id || index} />))
                }
            </div>
        </section>
    )
}

export default SkillsGrid;