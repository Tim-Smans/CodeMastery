import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FullExercise } from "@/lib/models/exercise"
import { FC } from "react"
import AddCategory from "./addCategory"
import { getCategories, getCategoriesFromExercise } from "@/lib/server/dal"
import DeleteCategoryBadge from "./deleteCategoryBadge"

interface Props {
  exercise: FullExercise
}

const ExerciseCrudDetailPage: FC<Props> = async ({ exercise }) => {
  const categories = await getCategoriesFromExercise(exercise.id);
  const allCategories = (await getCategories()).filter(category => !categories.find(c => c.id === category.id));

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Exercise Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h2>{exercise.title}</h2>
          </div>
          <div className="space-y-2">
            <h3>Description</h3>
            <p>{exercise.description}</p>
          </div>
          <div className="space-y-2 rounded">
            <h3>Difficulty</h3>
            <p>{exercise.difficulty}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Start Code</CardTitle>
          <CardDescription>Provide the initial code for the exercise.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Add startcode</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Add categories to help users find this exercise.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map((category) => (<DeleteCategoryBadge key={category.id} category={category} exerciseId={exercise.id} />))}
        </CardContent>
        <CardContent className="space-y-4">
          <AddCategory exerciseId={exercise.id} categories={allCategories} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Cases</CardTitle>
          <CardDescription>Add test cases to validate user solutions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button type="button">Add Test Case</Button>
        </CardContent>
      </Card>
    </>
  )
}

export default ExerciseCrudDetailPage