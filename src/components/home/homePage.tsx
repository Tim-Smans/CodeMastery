'use client'
import HeroSection from "@/components/home/heroSection"
import LeaderBoards from "@/components/home/leaderBoards"
import SiteHeader from "@/components/siteHeader"
import { Profile } from "@/lib/models/user"
import { User } from "@prisma/client"
import { FC } from "react"

interface Props {
    profile: Profile
    users: User[]
    isAdmin: boolean
}

const HomePageContainer: FC<Props> = ({ profile, users, isAdmin }) => {

    return (
        <div className="w-full flex flex-col items-center justify-center max-w-screen-xl">
            <>
                <SiteHeader profile={profile} isAdmin={isAdmin} />
            </>
            <div className="w-full flex flex-col items-center justify-center max-w-screen-xl">
                <HeroSection profile={profile} />
                <LeaderBoards users={users} />
            </div>
        </div>)
}

export default HomePageContainer