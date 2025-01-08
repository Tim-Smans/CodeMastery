import RolesList from "@/components/admin/crud/roles/rolesList";
import { getAllUsers, getRoles } from "@/lib/server/dal";
import { FC } from "react";

const CategoryListPage: FC = async () => {

    const roles = await getRoles();
    const users = await getAllUsers();
    return (
        <RolesList roles={roles} users={users} />
    )
}

export default CategoryListPage