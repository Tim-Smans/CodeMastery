"use client"
import { Badge } from "@/components/ui/badge";
import { removeCategoryFromExercise } from "@/lib/server/actions";
import { Category } from "@prisma/client";
import { X } from "lucide-react";
import { FC } from "react";

interface Props {
    category: Category
    exerciseId: string
}

const DeleteCategoryBadge: FC<Props> = ({category, exerciseId}) => {
    const handleDelete = async (categoryId: string) => {
        await removeCategoryFromExercise(categoryId, exerciseId)
    }


    return (
        <Badge variant="outline" key={category.id} className="m-1 bg-gray-200">
              {category.name}
              <X size={14} color="red" onClick={() => handleDelete(category.id)}/>
            </Badge>
    )
}

export default DeleteCategoryBadge