import AdminHeader from "@/components/admin/adminHeader";
import ForbiddenPage from "@/components/auth/forbiddenPage";
import { getSessionProfileOrRedirect, isAdmin } from "@/lib/server/actions"
import { FunctionComponent, PropsWithChildren } from "react"

const AdminLayout: FunctionComponent<PropsWithChildren> = async ({children}) => {
    await getSessionProfileOrRedirect();


    if(!await isAdmin()){
        return (
            <>
                <AdminHeader/>
                <ForbiddenPage/>
            </>
        )
    }
    return (
        <>
            <AdminHeader/>
            {children}
        </>
    )
  }
  
  export default AdminLayout