'use client'
import ListHeader from "@/components/exerciseList/listHeader"
import Sidebar from "@/components/exerciseList/sidebar"
import { FullExercise } from "@/lib/models/exercise"
import { FC, useState } from "react"
import ExerciseContent from "./exerciseContent"

        
interface Props {
    exercises: FullExercise[]
}
        
const ExerciseListPageContainer: FC<Props> = ({exercises}) => {
    const [selectedExercise, setSelectedExercise] = useState<FullExercise | undefined>(undefined);

    const handleSelectExercise = (exercise: FullExercise) => {
      setSelectedExercise(exercise)
    }  
    return (
        <div className="min-h-screen flex flex-col">
          <ListHeader />
          <div className="flex-1 flex">
            <Sidebar exercises={exercises} handleSelectExercise={handleSelectExercise}/>
            {
              selectedExercise == undefined ?
              <p>Select an exercise to get started..</p>
              :
              <ExerciseContent exercise={selectedExercise}/>
            }
          </div>
        </div>
        )
    }

export default ExerciseListPageContainer