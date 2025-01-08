import { FC } from "react"
import DAL from "@/lib/server/dal"
import ExerciseCrudDetailPage from "@/components/admin/crud/exercise/detailPage"

interface Props {
    params: Promise<{
      exerciseId: string
    }>
  }

  

const ExerciseDetailsPage: FC<Props> = async ({params}) => {
    
    const {exerciseId} = await params
    const exercise = await DAL.getFullExercise(exerciseId)
    
    if(exercise == null) return <h1>Exercise with id {exerciseId} does not exist...</h1>

    return (
        <ExerciseCrudDetailPage exercise={exercise} />
    )
}   

export default ExerciseDetailsPage