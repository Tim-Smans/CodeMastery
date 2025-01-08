import { CodeType } from '@prisma/client'
import {z} from 'zod'

export const startCodeSchema = z.object({
    id: z.string(),
    code: z.string(),
    type: z.nativeEnum(CodeType),
    exerciseId: z.string().uuid()
})

export const createStartCodeSchema = startCodeSchema.pick({code: true, type: true, exerciseId: true})
export const updateStartCodeSchema = startCodeSchema.pick({id: true, code: true, type: true, exerciseId: true})
