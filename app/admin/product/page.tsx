

'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { Package, Plus } from "lucide-react"

import { IProduct } from "@/app/admin/product/types/types"
import { AddProduct } from "./AddProduct"
import { TableProducts } from "@/app/admin/product/TableComponent"

interface ICategory {
    id: string
    name: string
}

export default function ProductAdminPage() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [categories, setCategories] = useState<ICategory[]>([])
    const [loading, setLoading] = useState(true)

    const handleFetchData = async () => {
        try {
            const categoriesRes = await axios.get("/api/categories")
            console.log("Categories response:", categoriesRes.data)
            setCategories(categoriesRes.data.data || [])

            const productsRes = await axios.get("/api/products")
            console.log("Products response:", productsRes.data)

            const raw = productsRes.data.data || []
            const normalized = raw.map((p: any) => ({
                id: p.id,
                name: p.name ?? "",
                price: p.price ?? 0,
                image: p.image ?? "",
                category: typeof p.category === 'string' 
                    ? { name: p.category }
                    : p.category ?? { name: "Men" },
                sizes: Array.isArray(p.sizes) ? p.sizes : [],
                colors: Array.isArray(p.colors) ? p.colors : [],
                isBest: p.isBest ?? false,
                isPopular: p.isPopular ?? false,
                isSale: p.isSale ?? false,
                createdAt: p.createdAt ?? new Date().toISOString()
            }))

            setProducts(normalized)
        } catch (error) {
            console.log("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleFetchData()
    }, [])

    const handleUpdateLocalState = (product: IProduct, type: string) => {
        if (type === "add") {
            setProducts([...products, product])
        }
        if (type === "edit") {
            setProducts(products.map(p => p.id === product.id ? product : p))
        }
        if (type === "delete") {
            setProducts(products.filter(p => p.id !== product.id))
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-gray-600">Loading products...</div>
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
                            <div className="bg-green-100 p-3 rounded-lg">
                                <Package className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
                                <p className="text-gray-600">Manage your store inventory</p>
                            </div>
                        </div>
                        <AddProduct 
                            categories={categories}
                            handleUpdateLocalState={handleUpdateLocalState} 
                        />
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">All Products ({products.length})</h2>
                    </div>
                    <TableProducts 
                        products={products} 
                        categories={categories}
                        handleUpdateLocalState={handleUpdateLocalState} 
                    />
                </div>
            </div>
        </div>
    )
}





