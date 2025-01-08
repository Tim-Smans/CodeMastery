'use client'
import { FullExercise } from "@/lib/models/exercise"
import { FC } from "react"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import { Difficulty } from "@prisma/client"

interface Props {
    exercise: FullExercise
    handleSelectExercise: (exercise: FullExercise)  => void
}

const SidebarItem: FC<Props> = ({ exercise, handleSelectExercise }) => {

    return (
        <div
            key={exercise.title}
            className="block p-4 rounded-xl hover:bg-gray-200"
            onClick={() => handleSelectExercise(exercise)}
        >
            <div className="flex flex-col space-y-2">
                <div className="font-medium text-red-500">{exercise.title}</div>
                <p className="text-sm text-muted-foreground">{exercise.description}</p>
                <div className="flex space-x-2">
                    <Badge
                        variant="secondary"
                        className={cn(
                            exercise.difficulty === Difficulty.EASY && 'bg-green-100 text-green-800',
                            exercise.difficulty === Difficulty.MEDIUM && 'bg-yellow-100 text-yellow-800',
                            exercise.difficulty === Difficulty.HARD && 'bg-red-100 text-red-800'
                        )}>
                        {exercise.difficulty}
                    </Badge>
                    {exercise.createdBy && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {exercise.creator.username}
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SidebarItem
