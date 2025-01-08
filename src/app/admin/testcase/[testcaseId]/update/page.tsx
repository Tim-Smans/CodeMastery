import { FC } from "react"
import DAL, { getFullExercises } from "@dal"
import { TestCase } from "@prisma/client"
import TestCaseForm from "@/components/admin/crud/testCase/newTestCaseForm"

interface Props {
    params: Promise<{
      testcaseId: string
    }>
  }

const UpdateTestCasePage: FC<Props> = async ({params}) => {
    const {testcaseId} = await params
    const testCase = await DAL.getTestCaseById(testcaseId)
    const exercises = await getFullExercises();

    return (
        <TestCaseForm isUpdate={true} existingTestCase={testCase as TestCase} exercises={exercises}/>
    )
}

export default UpdateTestCasePage