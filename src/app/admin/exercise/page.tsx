import { ExerciseList } from "@/components/admin/crud/exercise/exerciseList";
import { fetchFullExercises } from "@/lib/server/actions";


const AdminExerciseList = async () => {

    const exercises = await fetchFullExercises();

    return (
        <ExerciseList exercises={exercises}/>
    )
}

export default AdminExerciseList