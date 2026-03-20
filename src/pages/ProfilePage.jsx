import Profile from "@components/sections/Profile";
import { useQuery } from "@tanstack/react-query";
import { GET_APP_CONFIG } from "@utils/apis";

function ProfilePage() {


    const { data: appConfig, isLoading } = useQuery({
        queryKey: [`app-config`],
        queryFn: () => GET_APP_CONFIG().then(res => res.data),
        enabled: true,
        refetchOnWindowFocus: false
    });

    return (
        <div className="profile-page">
            <Profile appConfig={appConfig} isLoading={isLoading} />
        </div>
    )
}

export default ProfilePage;