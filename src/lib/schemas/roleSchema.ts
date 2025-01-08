import { z } from "zod"

export const roleSchema = z.object({
    id: z.string(),
    name: z.string().min(5, {
        message: 'The name of a category must be at least 5 characters long',
    }),
})

export const createRoleSchema = roleSchema.pick({name: true})
export const updateRoleSchema = roleSchema.pick({id: true, name: true})
