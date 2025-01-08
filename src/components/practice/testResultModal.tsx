"use client"
import { FC } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { CheckCircle2, XCircle } from "lucide-react"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { TestResult } from "@/lib/models/TestResult"

interface Props {
    isOpen: boolean
    onClose: () => void
    onFinish: () => void
    testResults: TestResult[] | null
  }
  
const TestResultModal: FC<Props> = ({isOpen, onClose, testResults, onFinish}) => {
    if(testResults === null) return <></>

    const passedTests = testResults.filter(tr => tr.passed).length
    const totalTests = testResults.length

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Test Results</DialogTitle>
            <DialogDescription>
              {passedTests === totalTests ? (
                <span className="text-green-500">All tests passed! Great job!</span>
              ) : (
                <span className="text-yellow-500">Some tests failed. Keep trying!</span>
              )}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-72 w-80 rounded-md">
          <div className="mt-4 space-y-4">
            {testResults.map((testResult, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Test Case {index + 1}</h3>
                  {testResult.passed ? (
                    <CheckCircle2 className="text-green-500 w-6 h-6" />
                  ) : (
                    <XCircle className="text-red-500 w-6 h-6" />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Input:</p>
                    <pre className="bg-muted p-2 rounded-md text-sm">{testResult.input}</pre>
                  </div>
                  <div>
                    <p className="font-medium">Expected Output:</p>
                    <pre className="bg-muted p-2 rounded-md text-sm">{testResult.expectedOutput}</pre>
                  </div>
                </div>
                {!testResult.passed && (
                  <div className="mt-2">
                    <p className="font-medium">Your Output:</p>
                    <pre className="bg-muted p-2 rounded-md text-sm">{testResult.result}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
          </ScrollArea>
          {passedTests === totalTests && (
            <Button onClick={onFinish}>Finish exercise</Button>
        )}
          <div className="mt-6 flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
}

export default TestResultModal