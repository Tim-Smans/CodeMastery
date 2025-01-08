import {z} from 'zod'

export const testcaseSchema = z.object({
    id: z.string(),
    exerciseId: z.string().uuid(),
    input: z.string().min(1, {
        message: 'The input of a testcase can not be empty',
    }),
    expectedOutput: z.string().min(1, {
        message: 'The output of a testcase can not be empty',
    }),
    createdAt: z.date(),
})

export const createTestCaseSchema = testcaseSchema.pick({input: true, expectedOutput: true, exerciseId: true})
export const updateTestCaseSchema = testcaseSchema.pick({id: true, input: true, expectedOutput: true})
