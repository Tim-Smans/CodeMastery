import NewCategoryForm from "@/components/admin/crud/category/categoryForm"
import { FC } from "react"
import DAL from "@dal"
import { Category } from "@prisma/client"

interface Props {
    params: Promise<{
      categoryId: string
    }>
}

const UpdateCategoryPage: FC<Props> = async ({params}) => {
    const {categoryId} = await params
    const category = await DAL.getCategoryById(categoryId)

    return (
        <NewCategoryForm isUpdate={true} existingCategory={category as Category}/>
    )
}

export default UpdateCategoryPage