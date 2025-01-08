"use client"

import { FC, useActionState, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Form from "@/components/form"
import FormError from "@/components/auth/formError"
import SubmitButtonWithLoading from "@/components/submitWithLoadingButton"
import Actions from '@actions'
import { TestCase } from "@prisma/client"
import { createTestCaseSchema, updateTestCaseSchema } from "@/lib/schemas/testCaseSchema"
import { FullExercise } from "@/lib/models/exercise"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
  isUpdate: boolean
  existingTestCase?: TestCase
  exercises: FullExercise[]	
}

//Toegevoegd omdat de form er niet mee om kan als het create is en dan een id verwacht. Nu is de id altijd optioneel.
type TestcaseFormValues = {
  exerciseId: string | null
  input: string
  expectedOutput: string
  id?: string
};

const TestCaseForm: FC<Props> = ({isUpdate, existingTestCase, exercises}) => {
  const [selectedExercise, setSelectedExercise] = useState<FullExercise | null>(null)
  const [actionResult,  executeAction] = useActionState(isUpdate ? Actions.updateTestCase : Actions.createNewTestCase, { success: false })

  const createHookForm = useForm<TestcaseFormValues>({
    resolver: zodResolver(createTestCaseSchema),
  });
  
  const updateHookForm = useForm<TestcaseFormValues>({
    defaultValues: {...existingTestCase},
    resolver: zodResolver(updateTestCaseSchema),
  });

   return (
    <Form hookForm={isUpdate ? updateHookForm : createHookForm} action={executeAction} actionResult={actionResult} id={existingTestCase?.id}>
      <Card>
        <CardHeader>
          <CardTitle>New testcase</CardTitle>
          <CardDescription>Provide the basic information for the new testcase.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Exercise</Label>
            <Select
                value={selectedExercise?.id || ''}
                onValueChange={(value) => {
                    const exercise = exercises.find((exercise) => exercise.id === value);
                    setSelectedExercise(exercise || null);
                    if (exercise) {
                    const hookForm = isUpdate ? updateHookForm : createHookForm;
                    hookForm.setValue('exerciseId', exercise.id);
                    }
                }}
                disabled={isUpdate}
                >

                <SelectTrigger>
                    <SelectValue placeholder="Select an exercise" />
                </SelectTrigger>
                <SelectContent>
                    {exercises.map((exercise) => (
                            <SelectItem key={exercise.id} value={exercise.id}>
                                {exercise.title}
                            </SelectItem>
                        
                    ))}
                </SelectContent>
            </Select>
            <FormError path="exerciseId" formErrors={isUpdate ? updateHookForm.formState.errors : createHookForm.formState.errors} serverErrors={actionResult} />
            <Input
              {...isUpdate ? updateHookForm.register('exerciseId') : createHookForm.register('exerciseId')}
              placeholder="exercise id"
              defaultValue={selectedExercise == null ? '' : selectedExercise.id}
            />
           
          </div>
          <div className="space-y-2">
            <Label htmlFor="input">Input </Label>
            <Textarea
              {...isUpdate ? updateHookForm.register('input') : createHookForm.register('input')}
              placeholder="Input"
              defaultValue={actionResult?.submittedData?.input ?? ''}
            />
           <FormError path="input" formErrors={isUpdate ? updateHookForm.formState.errors : createHookForm.formState.errors} serverErrors={actionResult} />
           </div>
           <div className="space-y-2">
            <Label htmlFor="input">Expected Output </Label>
            <Textarea
              {...isUpdate ? updateHookForm.register('expectedOutput') : createHookForm.register('expectedOutput')}
              placeholder="Expected output"
              defaultValue={actionResult?.submittedData?.expectedOutput ?? ''}
            />
           <FormError path="expectedOutput" formErrors={isUpdate ? updateHookForm.formState.errors : createHookForm.formState.errors} serverErrors={actionResult} />
           </div>
        </CardContent>
        <CardFooter>
          <SubmitButtonWithLoading text={`${isUpdate ? 'Update' : 'Create'} category`} loadingText={`${isUpdate ? 'Updating' : 'Creating'} category...`} />
        </CardFooter>
      </Card>
    </Form>
  )
} 

export default TestCaseForm