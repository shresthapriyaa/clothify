"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, Pencil } from "lucide-react"
import { EditCategory } from "./EditCategory"
import { DeleteCategory } from "./DeleteCategory"
import { useState } from "react"

interface ICategory {
    id: string
    name: string
    slug: string
    createdAt: string
    _count?: {
        products: number
    }
}

interface ITableCategoriesProps {
    categories: ICategory[]
    handleUpdateLocalState: (category: ICategory, type: string) => void
}

export function TableCategories({ categories, handleUpdateLocalState }: ITableCategoriesProps) {
    const [editingCategory, setEditingCategory] = useState<ICategory | null>(null)
    const [deletingCategory, setDeletingCategory] = useState<ICategory | null>(null)

    return (
        <>
            
        <div className=" bg-white text-black min-w-full rounded-2xl">
            <div className="border border-black/20 rounded-lg border-b-4 border-t-4">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {categories.map(category => (
                        <TableRow key={category.id}>
                            <TableCell className="font-mono text-sm">{category.id.slice(0, 8)}...</TableCell>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell className="text-black font-mono text-sm">{category.slug}</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {category._count?.products || 0} products
                                </span>
                            </TableCell>
                            <TableCell>
                                {new Date(category.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setEditingCategory(category)}
                                >
                                    <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => setDeletingCategory(category)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Edit Dialog */}
            {editingCategory && (
                <EditCategory
                    category={editingCategory}
                    open={!!editingCategory}
                    onOpenChange={(open) => !open && setEditingCategory(null)}
                    handleUpdateLocalState={handleUpdateLocalState}
                />
            )}

            {/* Delete Dialog */}
            {deletingCategory && (
                <DeleteCategory
                    category={deletingCategory}
                    open={!!deletingCategory}
                    onOpenChange={(open) => !open && setDeletingCategory(null)}
                    handleUpdateLocalState={handleUpdateLocalState}
                />
            )}
            </div>
        </div>
        </>
    )
}