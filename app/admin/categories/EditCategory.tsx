







// // app/admin/categories/EditCategory.tsx
// "use client"

// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import React, { useState, useEffect } from "react"
// import { toast } from "sonner"
// import axios from "axios"

// interface ICategory {
//     id: string
//     name: string
//     slug: string
//     createdAt: string
//     _count?: {
//         products: number
//     }
// }

// interface IEditCategoryProps {
//     category: ICategory
//     open: boolean
//     onOpenChange: (open: boolean) => void
//     handleUpdateLocalState: (category: ICategory, type: string) => void
// }

// export function EditCategory({ category, open, onOpenChange, handleUpdateLocalState }: IEditCategoryProps) {
//     const [loading, setLoading] = useState(false)
//     const [name, setName] = useState(category.name)

//     useEffect(() => {
//         setName(category.name)
//     }, [category])

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()
        
//         if (!name.trim()) {
//             toast.error("Please enter category name")
//             return
//         }

//         setLoading(true)
//         try {
//             console.log("Updating category:", category.id, "with name:", name)
            
//             const response = await axios.put(`/api/categories/${category.id}`, {  // ✅ Fixed - parentheses, not backticks
//                 name: name.trim()
//             })

//             console.log("Update response:", response.data)

//             if (response.status === 200) {
//                 toast.success("Category updated successfully!")
//                 handleUpdateLocalState(response.data.data, "edit")
//                 onOpenChange(false)
//             }
//         } catch (error: any) {
//             console.error("Update error:", error)
//             const errorMsg = error?.response?.data?.error || "Error updating category"
//             toast.error(errorMsg)
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent className="sm:max-w-md">
//                 <DialogHeader>
//                     <DialogTitle>Edit Category</DialogTitle>
//                 </DialogHeader>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium mb-2">Category Name *</label>
//                         <Input
//                             placeholder="e.g., Men, Women, Accessories"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                     </div>

//                     <Button 
//                         type="submit" 
//                         className="w-full bg-black text-white hover:bg-amber-100 hover:text-black border-b-4 border-t-4"
//                         disabled={loading}
//                     >
//                         {loading ? "Updating..." : "Update Category"}
//                     </Button>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     )
// }








"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import React, { useState, useEffect } from "react"
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

interface IEditCategoryProps {
    category: ICategory
    open: boolean
    onOpenChange: (open: boolean) => void
    handleUpdateLocalState: (category: ICategory, type: string) => void
}

export function EditCategory({ category, open, onOpenChange, handleUpdateLocalState }: IEditCategoryProps) {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(category.name)

    useEffect(() => {
        setName(category.name)
    }, [category])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!name.trim()) {
            toast.error("Please enter category name")
            return
        }

        setLoading(true)
        try {
            console.log("Updating category:", category.id, "with name:", name)
            
            const response = await axios.patch(`/api/categories/${category.id}`, {  // ✅ Changed from PUT to PATCH
                name: name.trim()
            })

            console.log("Update response:", response.data)

            if (response.data.success) {  //  Check success field
                toast.success("Category updated successfully!")
                handleUpdateLocalState(response.data.data, "edit")
                onOpenChange(false)
            }
        } catch (error: any) {
            console.error("Update error:", error)
            const errorMsg = error?.response?.data?.error || "Error updating category"
            toast.error(errorMsg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Category Name *</label>
                        <Input
                            placeholder="e.g., Men, Women, Accessories"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full bg-black text-white hover:bg-amber-100 hover:text-black border-b-4 border-t-4"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Category"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}