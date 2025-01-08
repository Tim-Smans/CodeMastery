import HomePageContainer from "@/components/home/homePage";
import { Profile } from "@/lib/models/user";
import { isAdmin } from "@/lib/server/actions";
import { getAllUsers } from "@/lib/server/dal";
import { getSessionProfile } from "@/lib/server/mediators/sessionManagementMediators"
import { User } from "@prisma/client";
import { FC } from "react"


const HomePage: FC = async () => {
    const profile = await getSessionProfile();


    const isUserAdmin = await isAdmin()
    const users = await getAllUsers()

    return (
        <div
            className="flex items-center justify-center w-full"
        >
            <HomePageContainer profile={profile as Profile} users={users as User[]} isAdmin={isUserAdmin}/>
        </div>
    )
}

export default HomePage