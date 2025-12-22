// "use client"

// import { IProduct } from "./types/types"
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { Button } from "@/components/ui/button"
// import axios from "axios"
// import { Trash } from "lucide-react"
// import { toast } from "sonner"

// interface IDeleteProductProps {
//     productId: string
//     handleUpdateLocalState: (product: IProduct, type: string) => void
// }

// export function DeleteProduct({ productId, handleUpdateLocalState }: IDeleteProductProps) {
//     const handleDeleteProduct = async () => {
//         try {
//             const response = await axios.delete(`/api/products/${productId}`)
//             if (response.status === 200) {
//                 handleUpdateLocalState(response.data.data, "delete")
//                 toast("Product Deleted Successfully")
//             }
//         } catch (error) {
//             toast("Error Deleting product")
//         }
//     }
    
//     return (
//         <AlertDialog>
//             <AlertDialogTrigger asChild>
//                 <Button size={'icon'} variant={'destructive'}>
//                     <Trash />
//                 </Button>
//             </AlertDialogTrigger>
//             <AlertDialogContent>
//                 <AlertDialogHeader>
//                     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                     <AlertDialogDescription>
//                         This action cannot be undone. This will permanently delete the
//                         product and remove its data from our servers.
//                     </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                     <AlertDialogCancel>Cancel</AlertDialogCancel>
//                     <AlertDialogAction onClick={handleDeleteProduct}>Delete</AlertDialogAction>
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>
//     )
// }





"use client"

import { IProduct } from "./types/types"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

interface IDeleteProductProps {
    productId: string
    handleUpdateLocalState: (product: IProduct, type: string) => void
}

export function DeleteProduct({ productId, handleUpdateLocalState }: IDeleteProductProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDeleteProduct = async () => {
        setLoading(true)
        try {
            console.log("Deleting product:", productId)
            
            const response = await axios.delete(`/api/products/${productId}`)
            
            console.log("Delete response:", response.data)

            if (response.status === 200) {
                // ✅ Fixed: Pass a product object with just the ID for deletion
                handleUpdateLocalState({ id: productId } as IProduct, "delete")
                toast.success("Product deleted successfully")
                setOpen(false)
            }
        } catch (error: any) {
            console.error("Delete error:", error)
            const errorMsg = error?.response?.data?.error || "Error deleting product"
            toast.error(errorMsg)
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button size={'icon'} variant={'destructive'}>
                    <Trash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the
                        product and remove its data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteProduct} disabled={loading}>
                        {loading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}