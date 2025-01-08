import CategoryList from "@/components/admin/crud/category/categoryList"
import { getCategories } from "@/lib/server/dal/categories"
import { FC } from "react"

const CategoryListPage: FC = async () => {

    const categories = await getCategories();
    return (
        <CategoryList categories={categories}/>
    )
}

export default CategoryListPage