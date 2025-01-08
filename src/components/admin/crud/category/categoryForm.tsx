"use client"

import { FC, useActionState } from "react"
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
import { createCategorySchema, updateCategorySchema } from "@/lib/schemas/categorySchema"
import Actions from '@actions'
import { Category } from "@prisma/client"

interface Props {
  isUpdate: boolean
  existingCategory?: Category
}

//Toegevoegd omdat de form er niet mee om kan als het create is en dan een id verwacht. Nu is de id altijd optioneel.
type CategoryFormValues = {
  name: string;
  description: string | null;
  id?: string;
};

const CategoryForm: FC<Props> = ({isUpdate, existingCategory}) => {
  const [actionResult,  executeAction] = useActionState(isUpdate ? Actions.updateCategory : Actions.createNewCategory, { success: false })

  const createHookForm = useForm<CategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
  });
  
  const updateHookForm = useForm<CategoryFormValues>({
    defaultValues: {...existingCategory},
    resolver: zodResolver(updateCategorySchema),
  });

   return (
    <Form hookForm={isUpdate ? updateHookForm : createHookForm} action={executeAction} actionResult={actionResult} id={existingCategory?.id}>
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>Provide the basic information for the new category.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Name</Label>
            <Input
              {...isUpdate ? updateHookForm.register('name') : createHookForm.register('name')}
              placeholder="Name"
              defaultValue={actionResult?.submittedData?.name ?? ''}
            />
           <FormError path="name" formErrors={isUpdate ? updateHookForm.formState.errors : createHookForm.formState.errors} serverErrors={actionResult} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              {...isUpdate ? updateHookForm.register('description') : createHookForm.register('description')}
              placeholder="Description"
              defaultValue={actionResult?.submittedData?.description ?? ''}
            />
           <FormError path="description" formErrors={isUpdate ? updateHookForm.formState.errors : createHookForm.formState.errors} serverErrors={actionResult} />
           </div>
        </CardContent>
        <CardFooter>
          <SubmitButtonWithLoading text={`${isUpdate ? 'Update' : 'Create'} category`} loadingText={`${isUpdate ? 'Updating' : 'Creating'} category...`} />
          
        </CardFooter>
      </Card>
    </Form>
  )
} 

export default CategoryForm