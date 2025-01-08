"use server"

import  DAL from '@dal';
import { ActionResponse } from "@/lib/models/actions"
import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"
import { formAction } from "../mediators/actionMediators"
import { createCategorySchema, updateCategorySchema } from '@/lib/schemas/categorySchema';
import { revalidatePath } from 'next/cache';

export const createNewCategory = async (_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> => {
    return formAction(createCategorySchema, formData, async (data) => {
  
      await DAL.createCategory(data as Prisma.CategoryCreateInput)
      redirect('/admin/category')
    })
}

export const updateCategory = async (_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> => {
  return formAction(updateCategorySchema, formData, async (data) => {

    await DAL.updateCategory(data as Prisma.CategoryUpdateInput & {id: string})
    redirect('/admin/category')
  })
}


export const deleteCategory = async (id: string) => {
    await DAL.deleteCategory(id)

    revalidatePath('/admin/category', 'page')
}
