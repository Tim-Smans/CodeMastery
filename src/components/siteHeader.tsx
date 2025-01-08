import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon } from 'lucide-react'
import { FC } from "react"
import UserDropdown from "./auth/userDropdown"
import { Profile } from "@/lib/models/user"

interface Props{
  profile: Profile
  isAdmin?: boolean
}

const SiteHeader: FC<Props> = ({profile, isAdmin}) => {
 
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-red-500">&lt;/&gt;</span>
                <span className="text-xl font-bold">CodeMastery</span>
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-2">
                {profile != null
                  &&
                <Button variant="ghost" asChild>
                  <Link href="/practice">Start Practicing</Link>
                </Button>
                }
                
                <Button variant="ghost" asChild>
                  <Link href="/leaderboard">Leaderboard</Link>
                </Button>
                <Button variant="ghost" asChild>
                  {profile == null ?
                    <Link href="/login">Register/Login</Link>
                    :
                    <UserDropdown profile={profile}/>
                  }
                </Button>
                {
                    isAdmin &&
                    <Button>
                      <Link href="/admin">Admin dashboard</Link>
                    </Button>
                }
                <Button variant="ghost" size="icon">
                  <Moon className="h-5 w-5" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </nav>
            </div>
          </div>
        </header>
      )
}
export default SiteHeader