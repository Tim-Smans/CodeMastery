import NewCategoryForm from "@/components/admin/crud/category/categoryForm"
import { FC } from "react"

const NewExercisePage: FC = () => {

    return (
        <NewCategoryForm isUpdate={false}/>
    )
}

export default NewExercisePage