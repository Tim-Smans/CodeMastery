'use server';
import { getFullExercises } from '../dal/exercises';
import { Prisma } from '@prisma/client';
import DAL from '@dal'
import { redirect } from 'next/navigation';
import { ActionResponse } from '@/lib/models/actions';
import { formAction } from '../mediators/actionMediators';
import { createExerciseSchema } from '@/lib/schemas/exerciseSchema';
import { log } from 'console';
import { revalidatePath } from 'next/cache';

export async function fetchFullExercises() {
  return await getFullExercises()
}

export async function createNewExercise(_prevState: ActionResponse, formData: FormData): Promise<ActionResponse>{
  return formAction(createExerciseSchema, formData, async (data, profile) => {
    log(data)
    await DAL.createExercise(data as Prisma.ExerciseCreateInput, profile.id)
    redirect('/admin/exercise')
  })
}

export const addCategoryToExercise = async (categoryId: string, exerciseId: string) => {
    await DAL.addCategoryToExercise(categoryId, exerciseId)

    revalidatePath('/admin/exercise/' + exerciseId, 'page')
};



export const removeCategoryFromExercise = async (categoryId: string, exerciseId: string) => {
  await DAL.removeCategoryFromExercise(categoryId, exerciseId)

  revalidatePath('/admin/exercise/' + exerciseId, 'page')
};


export const deleteExercise = async (id: string) => {
  await DAL.deleteExercise(id)

  revalidatePath('/admin/exercise', 'page')
};