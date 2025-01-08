import { TestCase } from '@/lib/models/testCase';
import {prismaClient} from '@/lib/server/dal/utils/prismaClient'
import { Prisma } from '@prisma/client';


export const getTestCases = async (): Promise<TestCase[]> => {
    return await prismaClient.testCase.findMany({include: {exercise: true}});
}

export const getTestCasesFromExercise = async (exerciseId: string): Promise<TestCase[]> => {
    return await prismaClient.testCase.findMany({
        where: {
            exerciseId: {
                equals: exerciseId
            }
        },
        include: {
            exercise: true
        }
    });
}

export const getTestCaseById = async (id: string): Promise<TestCase | null> => {
    return await prismaClient.testCase.findUnique({
        where: {
            id
        },
        include: {
            exercise: true
        }
    });
}

export const createTestCase = async (testCase: Prisma.TestCaseCreateInput, exerciseId: string): Promise<TestCase> => {
    return await prismaClient.testCase.create({
        data: {
            ...testCase,
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

export const updateTestCase = async (id: string, testCase: Prisma.TestCaseUpdateInput): Promise<TestCase> => {
    return await prismaClient.testCase.update({
        where: {
            id
        },
        data: {
            ...testCase
        },
        include: {
            exercise: true
        }
    });
}

export const removeTestCase = async (id: string) => {
    await prismaClient.testCase.delete({
        where: {
            id
        }
    });
}
