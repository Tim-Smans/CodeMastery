import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BarChart, Users, BookOpen, Code, CheckSquare, ShieldCheck } from 'lucide-react'
import { Profile } from "@/lib/models/user"
import { FC } from "react"


interface Props {
    profile: Profile
    stats: {
      totalExercises: number
      totalUsers: number
      totalCategories: number
    }
  }

const AdminDashboard: FC<Props> = ({profile, stats}) => {
    return (
<div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {profile.username}</CardTitle>
          <CardDescription>Admin Dashboard</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatar != null ? profile.avatar : ''} alt={profile.username} />
            <AvatarFallback>{profile.username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Email: {profile.email}</p>
            <p className="text-sm text-muted-foreground">Role: {profile.role.name}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exercises</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalExercises}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Exercises</CardTitle>
            <CardDescription>Manage coding exercises</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/admin/exercise">
                <BookOpen className="mr-2 h-4 w-4" />
                Manage Exercises
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Organize exercise categories</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/admin/category">
                <BarChart className="mr-2 h-4 w-4" />
                Manage Categories
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Start Codes</CardTitle>
            <CardDescription>Manage exercise start codes</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/admin/startcode">
                <Code className="mr-2 h-4 w-4" />
                Manage Start Codes
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Test Cases</CardTitle>
            <CardDescription>Manage exercise test cases</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/admin/testcase">
                <CheckSquare className="mr-2 h-4 w-4" />
                Manage Test Cases
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Roles</CardTitle>
            <CardDescription>Manage user roles and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/admin/roles">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Manage Roles
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
    )
}


export default AdminDashboard