import { FC } from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@prisma/client";

interface Props{
  users: User[]
}

const LeaderBoards: FC<Props> = ({users}) => {

  const orderedUsers = users.sort((a, b) => b.score - a.score).slice(0, 3);
  const highscore = Math.max(...users.map(x => x.score))

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">Leaderboard</h2>
            <div className="grid gap-6 md:grid-cols-3">

              {orderedUsers.map((x) => (
                <Card key={x.id} className="bg-secondary/50 rounded">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={x.avatar != null ? x.avatar : ""} alt={x.username} />
                        <AvatarFallback>{x.username[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{x.username}</h3>
                        <p className="text-sm text-muted-foreground">Score: {x.score}</p>
                      </div>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-red-500"
                        style={{ width: `${(x.score / highscore) * 100}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )
}

export default LeaderBoards