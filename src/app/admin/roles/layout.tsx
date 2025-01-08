import ForbiddenPage from "@/components/auth/forbiddenPage";
import { getSessionProfileOrRedirect, isSuperAdmin } from "@/lib/server/actions"
import { FunctionComponent, PropsWithChildren } from "react"

const SuperAdminLayout: FunctionComponent<PropsWithChildren> = async ({children}) => {
    await getSessionProfileOrRedirect();


    if(!await isSuperAdmin()){
        return (
            <>
                <ForbiddenPage/>
            </>
        )
    }
    return (
        <>
            {children}
        </>
    )
  }
  
  export default SuperAdminLayout