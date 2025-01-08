"use client"
import { FC } from "react"
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import Actions from "@actions";
import { TestCase } from "@/lib/models/testCase";

interface Props {
    testCases: TestCase[]
}


const TestCaseList: FC<Props> = ({ testCases }) => {

    const handleDelete = async (id: string) => {
        await Actions.deleteTestCase(id);
    }  



    return (
        <>
            <div className="border-b">
                <Button asChild className="w-full mt-4 mb-4">
                    <Link href="testcase/new">
                        Add a new testcase
                    </Link>
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>ExerciseId</TableHead>
                        <TableHead>Input</TableHead>
                        <TableHead>Expected Output</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {testCases.map((testCase) => (
                        <TableRow key={testCase.id}>
                            <TableCell>{testCase.id}</TableCell>
                            <TableCell>{testCase.exercise?.title}</TableCell>
                            <TableCell>{testCase.input}</TableCell>
                            <TableCell>{testCase.expectedOutput}</TableCell>
                            <TableCell>
                                <Button asChild className="m-1">
                                    <Link href={`/admin/testcase/${testCase.id}/update`}>Update</Link>
                                </Button>
                                <Button className="m-1" onClick={async () => await handleDelete(testCase.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default TestCaseList