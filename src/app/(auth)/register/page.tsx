import RegisterForm from "@/components/auth/registerForm"
import SiteHeader from "@/components/siteHeader"
import { Profile } from "@/lib/models/user"
import { isAdmin } from "@/lib/server/actions"
import { getSessionProfile } from "@/lib/server/mediators/sessionManagementMediators"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Register | CodeMastery",
    description: "Create a new CodeMastery account",
  }
  

const RegisterPage = async () => {
  const profile = await getSessionProfile();
  const admin = await isAdmin();
    return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader profile={profile as Profile} isAdmin={admin}/>
      <main className="flex-1">
        <div className="container flex h-full items-center justify-center py-12">
          <div className="w-full max-w-md space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <p className="text-5xl text-red-500">⌘</p>
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to CodeMastery
              </h1>
              <p className="text-sm text-muted-foreground">
                Fill out the form to create your account
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </main>
    </div>
      )
    }

export default RegisterPage