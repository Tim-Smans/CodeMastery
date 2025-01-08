import {z} from 'zod'

export const categorySchema = z.object({
    id: z.string(),
    name: z.string().min(5, {
        message: 'The name of a category must be at least 5 characters long',
    }),
    description: 
        z.preprocess(arg => (arg === '' ? undefined : arg),
        z.union([
        z.string().min(10, {
            message: 'The description of a category must be at least 10 characters long',
        }),
        z.literal(null),
    ])),
})

export const createCategorySchema = categorySchema.pick({name: true, description: true})
export const updateCategorySchema = categorySchema.pick({id: true, name: true, description: true})
