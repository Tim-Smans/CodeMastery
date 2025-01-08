"use server"

import  DAL from '@dal';
import { ActionResponse } from "@/lib/models/actions"
import { redirect } from "next/navigation"
import { formAction } from "../mediators/actionMediators"
import { createStartCodeSchema, updateStartCodeSchema } from '@/lib/schemas/startCodeSchema';
import { log } from 'console';
import { StartCode } from '@/lib/models/startCode';
import { revalidatePath } from 'next/cache';

export const createNewStartCode = async (_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> => {

    return formAction(createStartCodeSchema, formData, async (data) => {
      log(data)
      await DAL.createStartCode(
        {
          code: data.code,
          type: data.type
        }, 
        data.exerciseId)
      redirect('/admin/startcode')
    })
}

export const getStartCodesFromExercise = async (exerciseId: string): Promise<StartCode[]> => {
  return await DAL.getStartCodesFromExercise(exerciseId) as StartCode[]
}

export const deleteStartCode = async (id: string)=> {
  await DAL.deleteStartCode(id)

  revalidatePath('/admin/startcode', 'page')
}

export const updateStartcode = async (_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> => {
  return formAction(updateStartCodeSchema, formData, async (data) => {

    await DAL.updateStartCode(data.id, {
      code: data.code,
      type: data.type
    })
    redirect('/admin/startcode')
  })
}

export const getStartCodeByIdAction = async (id: string): Promise<StartCode | null> => {
  return await DAL.getStartCodeById(id)
}
