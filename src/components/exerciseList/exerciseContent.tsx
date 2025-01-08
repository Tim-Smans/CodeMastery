import { FC } from "react"
import { FullExercise } from "@/lib/models/exercise"
import { getDifficultyColor } from "@/lib/utils"
import StartCodeDisplay from "./startCodeDisplay"
import { Button } from "../ui/button"
import { redirect } from "next/navigation"

interface Props{
  exercise: FullExercise
}

const ExerciseContent: FC<Props> = ({exercise}) => {

    return (
    <div className="flex-1 p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{exercise.title} 
            <span className={`${getDifficultyColor(exercise.difficulty)}`}>({exercise.difficulty})</span>
          </h1> 
          <h5>Created by <span className="text-red-500">{exercise.creator.username}</span></h5>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">
              {exercise.description}
            </p>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Start codes:</h2>
          {
            exercise.startCode.map((startCode, i) => (
              <>
                <p key={i}>{startCode.type}</p>
                <StartCodeDisplay key={i} code={startCode.code} />
              </>
            ))
          }
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Hints</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {
              exercise.hints.map((hint, i) => (
                <li key={i}>{hint.content}</li>
              ))
            }
          </ul>
        </div>

        <Button onClick={() => redirect(`/practice/${exercise.id}`)}>Start the exercise</Button>
      </div>
    </div>
  )
}

export default ExerciseContent