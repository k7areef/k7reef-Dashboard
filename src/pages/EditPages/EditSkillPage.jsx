import React from "react";
import EditSkill from "@components/skills/EditSkill";
import { useQuery } from "@tanstack/react-query";
import { GET_SKILL } from "@utils/apis";
import { useParams } from "react-router-dom";

function EditSkillPage() {

    const { skillId } = useParams();

    const { data: skill, isLoading } = useQuery({ // Fetch skill
        queryKey: ['skill', skillId],
        queryFn: () => GET_SKILL(skillId).then(res => res.data),
        enabled: true,
        refetchOnWindowFocus: false
    });

    return (
        <div className="edit-skill-page">
            <EditSkill isLoading={isLoading} skill={skill} />
        </div>
    )
}

export default EditSkillPage;