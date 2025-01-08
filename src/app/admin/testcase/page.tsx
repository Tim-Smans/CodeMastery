import TestCaseList from "@/components/admin/crud/testCase/testCaseList";
import { getTestCases } from "@/lib/server/dal";
import { FC } from "react"

const TestCaseListPage: FC = async () => {

    const testcases = await getTestCases();
    return (
        <TestCaseList testCases={testcases}/>
    )
}

export default TestCaseListPage