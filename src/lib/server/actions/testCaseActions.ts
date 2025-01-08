"use server"
import { ActionResponse } from "@/lib/models/actions"
import { createTestCaseSchema, updateTestCaseSchema } from "@/lib/schemas/testCaseSchema"
import { formAction } from "../mediators/actionMediators"
import DAL from "@dal"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { TestCase } from '@prisma/client';

export const createNewTestCase = async (_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> => {

    return formAction(createTestCaseSchema, formData, async (data) => {
      await DAL.createTestCase(
        {
          expectedOutput: data.expectedOutput,
          input: data.input,
          createdAt: new Date(Date.now()),
        }, 
        data.exerciseId)
        
      redirect('/admin/testcase')
    })
}

export const updateTestCase = async (_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> => {
  return formAction(updateTestCaseSchema, formData, async (data) => {

    await DAL.updateTestCase(data.id, {
      expectedOutput: data.expectedOutput,
      input: data.input,
    })

    redirect('/admin/testcase')
})}

export const deleteTestCase = async (id: string) => {
  await DAL.removeTestCase(id)

  revalidatePath('/admin/testcase', 'page')
}

export const getTestCaseById = async (id: string): Promise<TestCase | null> => {
  return await DAL.getTestCaseById(id)
}