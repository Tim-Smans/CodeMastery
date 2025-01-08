import { FC } from "react"
import { FullExercise } from "@/lib/models/exercise"
import { ScrollArea } from "@/components/ui/scroll-area"
import SidebarItem from "./sidebarItem"

interface Props {
  exercises: FullExercise[]
  handleSelectExercise: (exercise: FullExercise)  => void
}

const Sidebar: FC<Props> = ({exercises, handleSelectExercise}) => {

  return (
  <ScrollArea style={{height: '45rem'}} className="rounded-md">
    <div className="w-80 border-r bg-background p-6">
      <h2 className="text-lg font-semibold mb-4">Exercises</h2>
      <div className="space-y-2">
        {exercises.map((exercise, i) => (
          <SidebarItem key={i} exercise={exercise} handleSelectExercise={handleSelectExercise}/>
        ))}
      </div>
    </div>
  </ScrollArea>
  )
}

export default Sidebar