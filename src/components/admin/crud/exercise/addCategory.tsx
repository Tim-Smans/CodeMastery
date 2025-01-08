"use client"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { addCategoryToExercise } from "@/lib/server/actions"
import { Category } from "@prisma/client"
import { FC } from "react"


interface Props {
    exerciseId: string
    categories: Category[]
}

const AddCategory: FC<Props> = ({  exerciseId, categories }) => {

    const handleClick = async (categoryId: string) => {
        await addCategoryToExercise(categoryId, exerciseId)
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button >Select new categories</Button>
            </SheetTrigger>
            <SheetContent className="bg-white">
                <SheetHeader>
                    <SheetTitle>Select categories</SheetTitle>
                    <SheetDescription>
                        Select a category you want to add to the exercise.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-96 w-70 rounded border">
                    {categories.map((category) => (
                        <Card key={category.id} className="m-4 p-4">
                            <CardTitle>{category.name}</CardTitle>
                            <CardFooter>
                                <SheetClose asChild>
                                    <Button className="mt-4" type="submit" onClick={() => handleClick(category.id)}>Add categories to exercise</Button>
                                </SheetClose>
                            </CardFooter>

                        </Card>
                    ))}
                </ScrollArea>
                <SheetClose asChild>
                    <Button className="mt-4" type="submit">Close</Button>
                </SheetClose>
            </SheetContent>
        </Sheet>
    )
}

export default AddCategory