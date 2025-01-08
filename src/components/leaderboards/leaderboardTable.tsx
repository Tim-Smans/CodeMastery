'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Zap, Target } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { FC } from "react"
import { User } from "@prisma/client"

interface Props{
  users: User[]
}

const LeaderboardTable: FC<Props> = ({users}) => {
    return(
        <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Rank</th>
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Score</th>
            <th className="px-4 py-2 text-left">Streak</th>
            <th className="px-4 py-2 text-left">Accuracy</th>
            <th className="px-4 py-2 text-left">Badge</th>
          </tr>
        </thead>
        <tbody>
          {users.map((x, i) => (
            <tr key={i} className="border-b">
              <td className="px-4 py-2">
                {i + 1 === 1 && <Trophy className="inline-block mr-2 text-yellow-500" />}
                {i + 1 === 2 && <Trophy className="inline-block mr-2 text-gray-400" />}
                {i + 1 === 3 && <Trophy className="inline-block mr-2 text-amber-600" />}
                {i + 1}
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={x.avatar != null ? x.avatar : ''} alt={x.username} />
                    <AvatarFallback>{x.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{x.username}</span>
                </div>
              </td>
              <td className="px-4 py-2">{x.score}</td>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <Zap className="mr-2 text-yellow-500" />
                  {x.streak} days
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <Target className="mr-2 text-green-500" />
                  <Progress value={x.accuracy} className="w-20 mr-2" />
                  {x.accuracy}%
                </div>
              </td>
              <td className="px-4 py-2">
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  {x.badge}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}

export default LeaderboardTable