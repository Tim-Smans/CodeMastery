import TestCaseForm from "@/components/admin/crud/testCase/newTestCaseForm"
import { getFullExercises } from "@/lib/server/dal";
import { FC } from "react"

const NewTestCasePage: FC = async () => {
    const exercises = await getFullExercises();

    return (
        <TestCaseForm isUpdate={false} exercises={exercises}/>
    )
}

export default NewTestCasePage