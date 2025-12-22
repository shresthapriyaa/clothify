






// 'use client'

// import axios from "axios"
// import { useEffect, useState } from "react"

// import { IProduct } from "@/app/admin/product/types/types"
// import { AddProduct } from "./AddProduct"
// import { TableProducts } from "@/app/admin/product/TableComponent"

// export default function ProductAdminPage() {
//     const [products, setProducts] = useState<IProduct[]>([])
    
//     // Your specific categories
//     const categories = [
//         { id: "1", name: "Men" },
//         { id: "2", name: "Women" },
//         { id: "3", name: "Bag" }
//     ]

//     const handleFetchProducts = async () => {
//         try {
//             const response = await axios.get("/api/products")
//             console.log("/api/products response:", response.data)

//             const raw = response.data.data || []
//             const normalized = raw.map((p: any) => ({
//                 id: p.id,
//                 name: p.name ?? "",
//                 price: p.price ?? 0,
//                 image: p.image ?? "",
//                 // Map category to object format
//                 category: typeof p.category === 'string' 
//                     ? { name: p.category }
//                     : p.category ?? { name: "Men" },
//                 sizes: Array.isArray(p.sizes) ? p.sizes : [],
//                 colors: Array.isArray(p.colors) ? p.colors : [],
//                 isBest: p.isBest ?? false,
//                 isPopular: p.isPopular ?? false,
//                 isSale: p.isSale ?? false,
//                 createdAt: p.createdAt ?? new Date().toISOString()
//             }))

//             setProducts(normalized)
//         } catch (error) {
//             console.log("Error fetching products:", error)
//         }
//     }

//     useEffect(() => {
//         handleFetchProducts()
//     }, [])

//     const handleUpdateLocalState = (product: IProduct, type: string) => {
//         if (type === "add") {
//             setProducts([...products, product])
//         }
//         if (type === "edit") {
//             setProducts(products.map(p => p.id === product.id ? product : p))
//         }
//         if (type === "delete") {
//             setProducts(products.filter(p => p.id !== product.id))
//         }
//     }

//     return (
//         <div className="flex flex-col m-20">
//             <div className="flex justify-between items-center mb-6">
//                 <div className="text-xl font-semibold text-white">All Products</div>
//                 <AddProduct 
//                     categories={categories}
//                     handleUpdateLocalState={handleUpdateLocalState} 
//                 />
//             </div>
//             <div className="w-full">
//                 <TableProducts 
//                     products={products} 
//                     categories={categories}
//                     handleUpdateLocalState={handleUpdateLocalState} 
//                 />
//             </div>
//         </div>
//     )
// }






'use client'

import axios from "axios"
import { useEffect, useState } from "react"

import { IProduct } from "@/app/admin/product/types/types"
import { AddProduct } from "./AddProduct"
import { TableProducts } from "@/app/admin/product/TableComponent"

interface ICategory {
    id: string
    name: string
}

export default function ProductAdminPage() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [categories, setCategories] = useState<ICategory[]>([])  // ✅ Changed to state
    const [loading, setLoading] = useState(true)

    const handleFetchData = async () => {
        try {
            // ✅ Fetch categories from API
            const categoriesRes = await axios.get("/api/categories")
            console.log("Categories response:", categoriesRes.data)
            setCategories(categoriesRes.data.data || [])

            // Fetch products
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
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-white">Loading...</div>
            </div>
        )
    }

    return (
        <div className="flex flex-col m-20">
            <div className="flex justify-between items-center mb-6">
                <div className="text-xl font-semibold text-white">All Products</div>
                <AddProduct 
                    categories={categories}  // ✅ Now using real categories from API
                    handleUpdateLocalState={handleUpdateLocalState} 
                />
            </div>
            <div className="w-full">
                <TableProducts 
                    products={products} 
                    categories={categories}
                    handleUpdateLocalState={handleUpdateLocalState} 
                />
            </div>
        </div>
    )
}