import { Metadata } from "next"
import ProfileForm from "./profileForm"
import { Profile } from "@/lib/models/user"
import { FC } from "react"

export const metadata: Metadata = {
    title: "Profile | CodeMastery",
    description: "Update your CodeMastery profile",
}

interface Props{
    profile: Profile
}

const ProfilePage: FC<Props> = ({profile}) => {
    return (
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            <div className="container py-8">
              <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
              <ProfileForm currentProfile={profile}/>
            </div>
          </main>
        </div>
      )
}  

export default ProfilePage
