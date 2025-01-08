'use server'
import { ActionResponse } from "@/lib/models/actions"
import { formAction } from "../mediators/actionMediators"
import { createRoleSchema } from "@/lib/schemas/roleSchema"
import { addRoleToUser, createRole, getRoleById } from "@dal"
import { Prisma, Role } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const createNewRole = async (_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> => {
    return formAction(createRoleSchema, formData, async (data) => {
  
      await createRole(data as Prisma.RoleCreateInput)
      revalidatePath('/admin/roles', 'page')
    })
}

export const getRoleByIdAction = async (id: string): Promise<Role> => {
  const role = await getRoleById(id);
  
  if(role === null) throw new Error('Role not found');
  return role;
}

export const assignRoleToUser = async (userId: string, roleId: string) => {
  await addRoleToUser(userId, roleId)
  revalidatePath('/admin/roles', 'page')
}