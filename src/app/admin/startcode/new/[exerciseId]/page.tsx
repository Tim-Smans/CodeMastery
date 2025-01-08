import { FC } from "react"
import NewStartCodeForm from "@/components/admin/crud/startCode/newStartCodeForm"
import { getStartCodesFromExercise } from "@/lib/server/actions/startCodeActions"

interface Props {
    params: Promise<{
      exerciseId: string
    }>
  }

  

const NewStartCodePage: FC<Props> = async ({params}) => {
    
    const {exerciseId} = await params
    const exerciseStartcodes = await getStartCodesFromExercise(exerciseId)

    return (
        <NewStartCodeForm exerciseId={exerciseId}  exerciseStartcodes={exerciseStartcodes}/>
    )
}   

export default NewStartCodePage