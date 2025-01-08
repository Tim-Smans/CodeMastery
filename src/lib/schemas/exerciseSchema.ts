import { Difficulty } from '@prisma/client';
import {z} from 'zod'

export const exerciseSchema = z.object({
    id: z.string(),
    title: z.string().min(5, {
        message: 'The title of an exercise must be at least 5 characters long',
    }),
    description: z.string().min(20, {
        message: 'The description of an exercise must be at least 20 characters long',
    }),
    difficulty: z.nativeEnum(Difficulty),
    createdBy: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export const createExerciseSchema = exerciseSchema.pick({title: true, description: true})
