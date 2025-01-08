import ExerciseListPageContainer from "@/components/exerciseList/listPage"
import { FullExercise } from "@/lib/models/exercise"
import { fetchFullExercises, getSessionProfileOrRedirect } from "@/lib/server/actions"
import { generateArtificialTimeout } from "@/lib/utils"


const ExerciseListPage = async () => {
  await generateArtificialTimeout();
  const exercises: FullExercise[] = await fetchFullExercises();
  await getSessionProfileOrRedirect();

    return (
        <ExerciseListPageContainer exercises={exercises} /> 
      )
    }

export default ExerciseListPage