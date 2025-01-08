"use client"
import { FC } from "react"
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Category } from "@prisma/client";
import Link from "next/link";
import Actions from "@actions";
interface Props {
    categories: Category[]
}


const CategoryList: FC<Props> = ({ categories }) => {

    const handleDelete = async (id: string) => {
        await Actions.deleteCategory(id);
    }  

    return (
        <>
            <div className="border-b p-2">
                <Button role="button" asChild className="w-full mt-4 mb-4">
                    <Link href="category/new">
                        Add a new category
                    </Link>
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.id}</TableCell>
                            <TableCell data-testid={`category-name-${category.name}`}>{category.name}</TableCell>
                            <TableCell data-testid={`category-updated-description-${category.name}`}>
                                {category.description}
                            </TableCell>
                            <TableCell>
                                <Button data-testid={`category-update-${category.name}`} asChild className="m-1" >
                                    <Link href={`/admin/category/${category.id}/update`}>Update</Link>
                                </Button>
                                <Button data-testid={`category-delete-${category.name}`} className="m-1" onClick={() => handleDelete(category.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default CategoryList