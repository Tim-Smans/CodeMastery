import LoginForm from "@/components/auth/loginForm"
import SiteHeader from "@/components/siteHeader"
import { Profile } from "@/lib/models/user"
import { getSessionProfile } from "@/lib/server/mediators/sessionManagementMediators"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Login | CodeMastery",
    description: "Login to your CodeMastery account",
  }
  

const LoginPage = async () => {
  const profile = await getSessionProfile();
    return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <main className="flex-1 w-full max-w-screen-xl">
      <SiteHeader  profile={profile as Profile}/>
        <div className="container flex h-full items-center justify-center py-12">
          <div className="w-full max-w-md space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <p className="text-5xl text-red-500">⌘</p>
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back to CodeMastery
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email to sign in to your account
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </main>
    </div>
      )
    }

export default LoginPage