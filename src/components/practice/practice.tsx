"use client"

import { FullExercise } from "@/lib/models/exercise"
import { FC, useState } from "react"
import ExerciseSidebar from "./exerciseSidebar"
import { Button } from "../ui/button"
import CodeEditor from "../editor/codeEditor"
import ExerciseHeader from "./exerciseHeader"
import { runTests } from "@/lib/server/actions/testingActions"
import TestResultModal from "./testResultModal"
import { redirect } from "next/navigation"
import Actions from "@actions"
import { toast } from "sonner"
import { TestResult } from "@/lib/models/TestResult"

interface Props {
  exercise: FullExercise
}

const Practice: FC<Props> = ({ exercise }) => {
  const [userCode, setUserCode] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[] | null>(null)


  const handleValueChange = (value: string | undefined) => {
    setUserCode(value || "")
  }

  const submitCode = () => {
    const results = runTests(userCode, exercise.testCases)
    setTestResults(results)
    setIsModalOpen(true)
  }

  const finishExercise = async () => {
      //Add score aan ingelogde gebruiker (session profile)
      await Actions.addScore(100)
      toast("Added 100 points to your profile.")
      redirect('/');
  }

  return (
    <>
      <ExerciseHeader />
      <div className="flex flex-col px-0">
        <main className="flex-1 flex">
          <div className="w-1/3 border-r">
            <ExerciseSidebar exercise={exercise} />
          </div>
          <div className="w-2/3 p-4 flex flex-col">
            {/* <CodeEditorTabs initialCode={exerciseData.initialCode} /> */}
            <CodeEditor onValueChange={handleValueChange} defaultValue={exercise.startCode[0].code} language={exercise.startCode[0].type} height="100%" width="100%"  />
            <div className="mt-4 flex justify-end">
              <Button onClick={submitCode}>Submit Solution</Button>
            </div>
          </div>
        </main>
      </div>
      <TestResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        testResults={testResults}
        onFinish={finishExercise}
      />
    </>
  )
}

export default Practice