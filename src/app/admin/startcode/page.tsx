import StartCodeList from "@/components/admin/crud/startCode/startCodeList"
import { getFullExercises } from "@/lib/server/dal";
import { getStartCodes } from "@/lib/server/dal/startCodes"
import { FC } from "react"


const StartCodePage:  FC = async () => {
    const startCodes = await getStartCodes();
    const exercises = await getFullExercises();

    return (
        <StartCodeList startCodes={startCodes} exercises={exercises}/>
    )
}

export default StartCodePage