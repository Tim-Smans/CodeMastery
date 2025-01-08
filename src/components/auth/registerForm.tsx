"use client"

import { FC, useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Chrome } from 'lucide-react'
import Link from "next/link"
import Actions from '@actions'
import { useForm } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import Form from "./form"
import FormError from "./formError"
import SubmitButtonWithLoading from "./submitButtonWithLoading"
import { createUserSchema } from "@/lib/schemas/userSchemas"




const RegisterForm: FC = () => {
    const [isLoading] = useState<boolean>(false)

    const [actionResponse, signInOrRegister] = useActionState(Actions.signInOrRegister, { success: false })

    
    const form = useForm({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            email: '',
            username: '',
            password: '',
            passwordConfirmation: ''
        },
    })

    
    return (
        <div className="grid gap-6">
            <Form hookForm={form} action={signInOrRegister} actionResult={actionResponse}>
                <div className="grid gap-4">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            {...form.register('email')}
                            placeholder="Email"
                            className="rounded"
                            defaultValue={actionResponse?.submittedData?.email ?? ''}
                        />
                        <FormError path="email" formErrors={form.formState.errors} serverErrors={actionResponse} />
                    </div>


                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            {...form.register('username')}
                            placeholder="Username"
                            defaultValue={actionResponse?.submittedData?.username ?? ''}
                        />
                        <FormError path="username" formErrors={form.formState.errors} serverErrors={actionResponse} />
                    </div>


                    <div className="grid gap-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            {...form.register('password')}
                            placeholder="Password"
                            className="rounded"
                            type="password"
                            defaultValue={actionResponse?.submittedData?.password ?? ''}
                        />
                        <FormError path="password" formErrors={form.formState.errors} serverErrors={actionResponse} />
                    </div>

                    <div>
                        <Label htmlFor="passwordConfirmation">Confirm your password</Label>
                        <Input
                            {...form.register('passwordConfirmation')}
                            placeholder="Confirm you password"
                            type="password"
                            defaultValue={actionResponse?.submittedData?.passwordConfirmation ?? ''}
                        />
                        <FormError path="passwordConfirmation" formErrors={form.formState.errors} serverErrors={actionResponse} />
                    </div>

                    
                </div>
                <SubmitButtonWithLoading
                        className="mt-4 bg-red-500 rounded hover:bg-red-600"
                        loadingText="Creating your account ..."
                        text="Sign up"
                    />
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <Button variant="outline" disabled={isLoading} className="rounded">
                    <Github className="mr-2 h-4 w-4" />
                    Github
                </Button>
                <Button variant="outline" disabled={isLoading} className="rounded">
                    <Chrome className="mr-2 h-4 w-4" />
                    Google
                </Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline hover:text-primary">
                    Sign up
                </Link>
            </div>
        </div>
    )
}

export default RegisterForm