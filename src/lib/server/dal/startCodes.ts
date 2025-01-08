import "server-only"
import { StartCode } from "@/lib/models/startCode";
import { prismaClient } from "./utils/prismaClient";
import { Prisma } from "@prisma/client";


export const getStartCodes = async (): Promise<StartCode[]> => {
    return await prismaClient.startCode.findMany({
        include: {
            exercise: true
        }
    });
}

export const getStartCodeById = async (id: string)=> {
    return await prismaClient.startCode.findUnique({
        where: {
            id
        },
        include: {
            exercise: true
        }
    });
}

export const getStartCodesFromExercise = async (exerciseId: string): Promise<StartCode[] | null> => {
    return await prismaClient.startCode.findMany({
        where: {
            exerciseId: exerciseId
        } 
    })  as StartCode[];
}

export const createStartCode = async (startCode: Prisma.StartCodeCreateWithoutExerciseInput, exerciseId: string): Promise<StartCode> => {
    return await prismaClient.startCode.create(
        {
            data: {
                ...startCode,
                exercise: {
                    connect: {
                        id: exerciseId
                    }
                }
            },
            include: {
                exercise: true
            }
        });
}

export const updateStartCode = async (id: string, startCode: Prisma.StartCodeUpdateInput): Promise<StartCode> => {
    return await prismaClient.startCode.update({
            where: {
                id
            },
            data: {
                ...startCode,
            },
            include: {
                exercise: true
            }
    });
}

export const deleteStartCode = async (id: string): Promise<StartCode> => {
    return await prismaClient.startCode.delete({
        where: {
            id
        },
        include: {
            exercise: true
        }
    });
}