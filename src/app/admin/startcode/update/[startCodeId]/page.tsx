import { FC } from "react"
import DAL from "@/lib/server/dal"
import NewStartCodeForm from "@/components/admin/crud/startCode/newStartCodeForm"
import { getStartCodesFromExercise } from "@/lib/server/actions/startCodeActions"

interface Props {
    params: Promise<{
      startCodeId: string
    }>
  }

  

const NewStartCodePage: FC<Props> = async ({params}) => {
    
    const {startCodeId} = await params
    const startCode = await DAL.getStartCodeById(startCodeId)

    if(startCode == null){
      return (<h1>Startcode with id {startCodeId} does not exist...</h1>)
    }

    const exerciseStartcodes = await getStartCodesFromExercise(startCode.exerciseId)

    return (
        <NewStartCodeForm exerciseId={startCodeId} existingStartcode={startCode}  exerciseStartcodes={exerciseStartcodes} isUpdate/>
    )
}   

export default NewStartCodePage