import { Difficulty } from "@prisma/client"
import { Badge } from "./ui/badge"
import { FC } from "react"


interface Props{
    difficulty: Difficulty
}

const DifficultyBadge: FC<Props> = ({ difficulty }) => {
    return (
        <Badge
            variant="secondary"
            className={
                difficulty === 'EASY'
                    ? 'bg-green-100 text-green-800'
                    : difficulty === 'MEDIUM'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
            }
        >{difficulty}</Badge>
    )
}

export default DifficultyBadge