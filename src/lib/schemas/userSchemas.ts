import {z} from 'zod'

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, {message: 'The password must be at least 8 characters long.'})
    .max(100, {message: "The password can't be longer than 100 characters."}),
  username: z.string().min(3, {message: 'The username must be at least 3 characters long.'}),
  avatar: z.string()
})

export const loginSchema = userSchema.pick({email: true, password: true})

export const createUserSchema = userSchema
  .omit({id: true, avatar: true})
  .extend({
    passwordConfirmation: z.string(),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'The password and confirmation do not match.',
  })

  
export const updateUserSchema = userSchema.pick({username: true, email: true})
