'use client'

import { Profile } from "@/lib/models/user"
import { FC, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface Props {
    currentProfile: Profile
}

const ProfileForm: FC<Props> = ({ currentProfile }) => {
    const [username, setUsername] = useState<string>(currentProfile.username)
    const [email, setEmail] = useState<string>(currentProfile.email)
    const [avatarSrc, setAvatarSrc] = useState<string | null>(currentProfile.avatar)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        // Here you would typically send the updated data to your backend
        console.log({ username, email , avatarSrc})
    }

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setAvatarSrc(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={avatarSrc == null ? '' : avatarSrc} alt={username} />
                            <AvatarFallback>{username[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <Label htmlFor="avatar" className="cursor-pointer">
                                <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 rounded-md">
                                <Input className="rounded" id="picture" type="file" />                                    
                                <span>Upload new picture</span>
                                </div>
                            </Label>
                            <Input
                                id="avatar"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            className="rounded"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            className="rounded"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 rounded">Update Profile</Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default ProfileForm