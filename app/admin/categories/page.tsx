'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { AddCategory } from "./AddCategory"
import { TableCategories } from "./TableCategories"

interface ICategory {
    id: string
    name: string
    slug: string
    createdAt: string
    _count?: {
        products: number
    }
}

function CategoriesPage() {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [loading, setLoading] = useState(true)

    const handleFetchData = async () => {
        try {
            const categoriesRes = await axios.get("/api/categories")

            console.log("Categories response:", categoriesRes.data)

            setCategories(categoriesRes.data.data || categoriesRes.data || [])
        } catch (error) {
            console.log("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleFetchData()
    }, [])

    const handleUpdateLocalState = (category: ICategory, type: string) => {
        if (type === "add") {
            console.log("New Category:", category)
            setCategories([category, ...categories])
        }
        if (type === "edit") {
            setCategories(categories.map(c => c.id === category.id ? category : c))
        }
        if (type === "delete") {
            setCategories(categories.filter((c) => c.id !== category.id))
        }
    }

    return (
        <div className="flex flex-col m-20">
            <div className="flex justify-between mb-6">
                <div className="text-xl font-semibold">All Categories</div>
                <AddCategory 
                    handleUpdateLocalState={handleUpdateLocalState} 
                />
            </div>
            <div className="w-full">
                {loading ? (
                    <div className="text-center p-8">Loading...</div>
                ) : (
                    <TableCategories 
                        categories={categories}
                        handleUpdateLocalState={handleUpdateLocalState}
                    />
                )}
            </div>
        </div>
    )
}

export default CategoriesPage