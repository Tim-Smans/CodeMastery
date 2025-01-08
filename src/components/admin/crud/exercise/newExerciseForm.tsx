"use client"

import { FC, useActionState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { z } from 'zod'
import React from "react"
import { useForm } from "react-hook-form"
import { createExerciseSchema } from "@/lib/schemas/exerciseSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Form from "@/components/form"
import FormError from "@/components/auth/formError"
import SubmitButtonWithLoading from "@/components/submitWithLoadingButton"
import { createNewExercise } from "@/lib/server/actions"


const NewExerciseForm: FC = () => {
  const [actionResult, createExercise] = useActionState(createNewExercise, { success: false })

  const hookForm = useForm<z.infer<typeof createExerciseSchema>>({
    resolver: zodResolver(createExerciseSchema),
  })

   return (
    <Form hookForm={hookForm} action={createExercise} actionResult={actionResult}>
      <Card>
        <CardHeader>
          <CardTitle role="heading">Exercise Details</CardTitle>
          <CardDescription>Provide the basic information for the new exercise.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              {...hookForm.register('title')}
              placeholder="Title"
              defaultValue={actionResult?.submittedData?.title ?? ''}
            />
           <FormError path="title" formErrors={hookForm.formState.errors} serverErrors={actionResult} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              {...hookForm.register('description')}
              placeholder="Description"
              defaultValue={actionResult?.submittedData?.description ?? ''}
            />
            <FormError role="description-error" path="description" formErrors={hookForm.formState.errors} serverErrors={actionResult} />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButtonWithLoading role="button" text="Create exercise" loadingText="Creating exercise..." />
        </CardFooter>
      </Card>
    </Form>
  )
} 

export default NewExerciseForm