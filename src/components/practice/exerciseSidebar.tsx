import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FullExercise } from "@/lib/models/exercise"
import { FC } from "react"
import DifficultyBadge from "../difficultyBadge"

interface Props {
    exercise: FullExercise
}

const ExerciseSidebar: FC<Props> = ({exercise}) => {
    return (
        <div className="w-full h-full overflow-auto p-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{exercise.title}</CardTitle>
              <CardDescription>
                <DifficultyBadge difficulty={exercise.difficulty} />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{exercise.description}</p>
            </CardContent>
          </Card>
    
          <Card>
            <CardHeader>
              <CardTitle>Test Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exercise.testCases.map((testCase, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-sm">Test Case {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <h4 className="text-sm font-medium">Input:</h4>
                          <pre className="text-sm bg-gray-100 p-2 m-1 rounded-md">{testCase.input}</pre>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Expected Output:</h4>
                          <pre className="text-sm bg-gray-100 p-2 m-1 rounded-md">{testCase.expectedOutput}</pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )
}

export default ExerciseSidebar