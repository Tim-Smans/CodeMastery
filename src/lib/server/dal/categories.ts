import { Category, Prisma } from "@prisma/client";
import {prismaClient} from '@/lib/server/dal/utils/prismaClient'

export const getCategories = async (): Promise<Category[]> => {
    return await prismaClient.category.findMany();
}

export const getCategoryById = async (id: string): Promise<Category | null> => {
    return await prismaClient.category.findUnique({where: {id}});
}

export const getCategoriesFromExercise = async (exerciseId: string): Promise<Category[]> => {
    return await prismaClient.category.findMany({
        where: {
            exercises: {
                some: {
                    id: exerciseId
                }
            }
        }
    });
}

export const createCategory = async (category: Prisma.CategoryCreateInput): Promise<Category> => {
    return await prismaClient.category.create({data: category});
}

export const updateCategory = async (category: Prisma.CategoryUpdateInput & { id: string }) => {
    await prismaClient.category.update({
            where: {
                id: category.id
            }, 
            data: category
        });
}

export const deleteCategory = async (id: string) => {
    await prismaClient.category.delete({where: {id}});
}

export const addCategoryToExercise = async (categoryId: string, exerciseId: string) => {
    await prismaClient.category.update(
        {
            where: {id: categoryId}, 
            data: {
                exercises: {
                    connect: {id: exerciseId}
                }
            }
        }
    )
};

export const removeCategoryFromExercise = async (categoryId: string, exerciseId: string) => {
    await prismaClient.category.update(
        {
            where: {id: categoryId}, 
            data: {
                exercises: {
                    disconnect: {id: exerciseId}
                }
            }
        }
    )
};