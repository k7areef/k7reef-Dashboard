import AddNewSkill from "@components/skills/AddNewSkill";
import SkillsGrid from "@components/skills/SkillsGrid";
import ModalBase from "@components/UI/ModalBase";
import { useAddNewSkillContext } from "@contexts/AddNewSkillContext";
import { useQuery } from "@tanstack/react-query";
import { GET_SKILLS } from "@utils/apis";

function SkillsPage() {

    const { isOpen, closeModal } = useAddNewSkillContext();

    const { data: skills, isLoading } = useQuery({
        queryKey: [`skills`],
        queryFn: () => GET_SKILLS().then(res => res.data),
        enabled: true,
        refetchOnWindowFocus: false
    });

    return (
        <div className="skills-page">
            {
                isLoading ? (
                    <>Loading...</>
                ) : (
                    <SkillsGrid skills={skills} />
                )
            }
            {/* Add New Skill Modal */}
            <ModalBase isOpen={isOpen} closeModal={closeModal}>
                <AddNewSkill />
            </ModalBase>
        </div>
    )
}

export default SkillsPage;