
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
// import { useState } from "react"

// interface IDeleteProductProps {
//     productId: string
//     handleUpdateLocalState: (product: IProduct, type: string) => void
// }

// export function DeleteProduct({ productId, handleUpdateLocalState }: IDeleteProductProps) {
//     const [open, setOpen] = useState(false)
//     const [loading, setLoading] = useState(false)

//     const handleDeleteProduct = async () => {
//         setLoading(true)
//         try {
//             console.log("Deleting product:", productId)
            
//             const response = await axios.delete(`/api/products/${productId}`)
            
//             console.log("Delete response:", response.data)

//             if (response.status === 200) {
                
//                 handleUpdateLocalState({ id: productId } as IProduct, "delete")
//                 toast.success("Product deleted successfully")
//                 setOpen(false)
//             }
//         } catch (error: any) {
//             console.error("Delete error:", error)
//             const errorMsg = error?.response?.data?.error || "Error deleting product"
//             toast.error(errorMsg)
//         } finally {
//             setLoading(false)
//         }
//     }
    
//     return (
//         <AlertDialog open={open} onOpenChange={setOpen}>
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
//                     <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
//                     <AlertDialogAction onClick={handleDeleteProduct} disabled={loading}>
//                         {loading ? "Deleting..." : "Delete"}
//                     </AlertDialogAction>
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
    productImage?: string
    handleUpdateLocalState: (product: IProduct, type: string) => void
}

export function DeleteProduct({ productId, productImage, handleUpdateLocalState }: IDeleteProductProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDeleteProduct = async () => {
        setLoading(true)
        try {
            console.log("Deleting product:", productId)
            
            const response = await axios.delete(`/api/products/${productId}`)
            
            console.log("Delete response:", response.data)

            if (response.status === 200) {
                // Delete image file if exists
                if (productImage) {
                    const filename = productImage.split('/').pop()
                    if (filename) {
                        try {
                            await axios.delete(`/api/upload?filename=${filename}`)
                            console.log("Image deleted:", filename)
                        } catch (error) {
                            console.log("Image delete failed, but product was deleted")
                        }
                    }
                }
                
                handleUpdateLocalState({ id: productId } as IProduct, "delete")
                toast.success("Product deleted successfully")
                setOpen(false)
            }
        } catch (error: any) {
            console.error("Delete error:", error)
            const errorMsg = error?.response?.data?.message || error?.response?.data?.error || "Error deleting product"
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