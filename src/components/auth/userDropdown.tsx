import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Actions from '@actions'
import { FC } from "react"
import { Profile } from "@/lib/models/user";
import Link from "next/link";

interface Props {
  profile: Profile
}

const UserDropdown: FC<Props> = ({ profile }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-3xl pt-6 pb-6">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile.avatar != null ? profile.avatar : ''} alt={profile.username} />
            <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          {profile.username}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/profile">
            Profile
            </Link>
            <DropdownMenuShortcut>/profile</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>/settings</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={Actions.signOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


export default UserDropdown