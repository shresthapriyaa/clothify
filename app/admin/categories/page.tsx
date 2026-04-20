'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { Layers, Plus } from "lucide-react"
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-gray-600">Loading categories...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-orange-100 p-3 rounded-lg">
                                <Layers className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
                                <p className="text-gray-600">Organize your products by categories</p>
                            </div>
                        </div>
                        <AddCategory 
                            handleUpdateLocalState={handleUpdateLocalState} 
                        />
                    </div>
                </div>

                {/* Categories Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">All Categories ({categories.length})</h2>
                    </div>
                    <TableCategories 
                        categories={categories}
                        handleUpdateLocalState={handleUpdateLocalState}
                    />
                </div>
            </div>
        </div>
    )
}

export default CategoriesPage