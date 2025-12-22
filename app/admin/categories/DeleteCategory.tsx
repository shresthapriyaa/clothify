"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"

interface ICategory {
    id: string
    name: string
    slug: string
    createdAt: string
    _count?: {
        products: number
    }
}

interface IDeleteCategoryProps {
    category: ICategory
    open: boolean
    onOpenChange: (open: boolean) => void
    handleUpdateLocalState: (category: ICategory, type: string) => void
}

export function DeleteCategory({ category, open, onOpenChange, handleUpdateLocalState }: IDeleteCategoryProps) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(true)
        try {
            const response = await axios.delete(`/api/categories/${category.id}`)

            if (response.status === 200) {
                toast("Category Deleted Successfully")
                handleUpdateLocalState(category, "delete")
                onOpenChange(false)
            }
        } catch (error: any) {
            const errorMsg = error?.response?.data?.error || "Error Deleting Category"
            toast(errorMsg)
            console.error("Delete category error:", error)
        } finally {
            setLoading(false)
        }
    }

    const hasProducts = category._count && category._count.products > 0

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {hasProducts ? (
                            <span className="text-red-600 font-semibold">
                                This category has {category._count?.products} product(s). 
                                You cannot delete it until all products are reassigned or removed.
                            </span>
                        ) : (
                            `This will permanently delete "${category.name}". This action cannot be undone.`
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={handleDelete}
                        disabled={loading || hasProducts}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}