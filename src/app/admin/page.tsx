import AdminDashboard from "@/components/admin/dashboard";
import { Profile } from "@/lib/models/user";
import { fetchFullExercises, getSessionProfile } from "@/lib/server/actions";
import { getAllUsers } from "@/lib/server/dal";
import { getCategories } from "@/lib/server/dal/categories";


const AdminPage = async () => {
    const profile = await getSessionProfile();
    const exerciseCount = (await fetchFullExercises()).length;
    const userCount = (await getAllUsers()).length;
    const categoryCount = (await getCategories()).length;
    
    return (
        <AdminDashboard profile={profile as Profile} stats={{totalExercises: exerciseCount, totalUsers: userCount, totalCategories: categoryCount}}/>
    )
}

export default AdminPage