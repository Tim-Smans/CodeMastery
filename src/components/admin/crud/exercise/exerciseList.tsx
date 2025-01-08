"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FullExercise } from "@/lib/models/exercise"
import { deleteExercise } from "@/lib/server/actions"
import { Difficulty } from "@prisma/client"
import Link from "next/link"
import { FC } from "react"

interface Props {
    exercises: FullExercise[]
}

export const ExerciseList: FC<Props> = ({exercises}) => {

    return(
        <>
        <div className="border-b p-2">
            <Button role="button" asChild className="w-full mt-4 mb-4">
                <Link href="exercise/new">
                    Add a new exercise
                </Link>
            </Button>
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Categories</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {exercises.map((exercise) => (
                    <TableRow key={exercise.id}>
                        <TableCell data-testid={`exercise-name-${exercise.title}`} >{exercise.title}</TableCell>
                        <TableCell>
                            <Badge
                                variant="secondary"
                                className={
                                    exercise.difficulty === Difficulty.EASY
                                        ? 'bg-green-100 text-green-800'
                                        : exercise.difficulty === Difficulty.MEDIUM
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                }
                            >
                                {exercise.difficulty}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {exercise.categories.map((category) => (
                                <Badge key={category.id} variant="outline" className="mr-1">
                                    {category.name}
                                </Badge>
                            ))}
                        </TableCell>
                        <TableCell>
                        <Button className="m-1" asChild>
                            <Link href={`/admin/exercise/${exercise.id}`}>Details</Link>
                        </Button>
                        <Button data-testid={`exercise-delete-${exercise.title}`} className="m-1" onClick={() => deleteExercise(exercise.id)}>
                            Delete 
                        </Button>
                            
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </>
    )
}
