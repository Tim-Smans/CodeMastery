import ProfilePage from "@/components/profile/profilePage";
import { getSessionProfileOrRedirect } from "@/lib/server/actions"


const ExerciseListPage = async () => {
  //const admin = await isAdmin();
  const profile = await getSessionProfileOrRedirect();

    return (
         
        <ProfilePage profile={profile}/>
      )
    }

export default ExerciseListPage