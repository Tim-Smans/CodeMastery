import "server-only"
import { FullExercise } from '@/lib/models/exercise'
import {prismaClient} from '@/lib/server/dal/utils/prismaClient'
import { Prisma } from '@prisma/client';

/**
 *
 * @returns A list of exercises with their relations
 */
export const getFullExercises = async (): Promise<FullExercise[]> => {
    return await prismaClient.exercise.findMany({
        include: {
            completedBy: true,
            categories: true,
            creator: true,
            results: true,
            testCases: true,
            startCode: true,
            hints: true
        }
    }) as FullExercise[]
}

export const getFullExercise = async (id: string): Promise<FullExercise> => {
    return await prismaClient.exercise.findUnique({
        where: {id},
        include: {
            completedBy: true,
            categories: true,
            creator: true,
            results: true,
            testCases: true,
            startCode: true,
            hints: true
        }
    }) as FullExercise
}


export const createExercise = async (exercise: Prisma.ExerciseCreateInput, profileId: string) => {
    const result = await prismaClient.exercise.create({
        data: {
            ...exercise,
            creator: {
                connect: {
                    id: profileId
                }
            }
        },
        select: {
            id: true
        }
    })

    return result;
}

export const updateExercise = async (exercise: Prisma.ExerciseUpdateInput & {id: string}) => {
    return await prismaClient.exercise.update({
        where: {
            id: exercise.id
        },
        data: exercise
    })
}

export const deleteExercise = async (id: string) => {
    return await prismaClient.exercise.delete({
        where: {
            id
        }
    })
}