import { FC } from "react"
import DAL from "@dal"
import Practice from "@/components/practice/practice"

interface Props {
    params: Promise<{
      exerciseId: string
    }>
  }

const PracticePage: FC<Props> = async ({params}) => {
    const {exerciseId} = await params
    const exercise = await DAL.getFullExercise(exerciseId)

    return (
        <Practice exercise={exercise}/>
    )
}

export default PracticePage