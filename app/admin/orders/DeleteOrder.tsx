
"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"
import { IOrder } from "./types/types"
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

interface IDeleteOrderProps {
    orderId: string
    handleUpdateLocalState: (order: IOrder, type: string) => void
}

export function DeleteOrder({ orderId, handleUpdateLocalState }: IDeleteOrderProps) {
    const handleDeleteOrder = async () => {
        try {
            const response = await axios.delete(`/api/orders/${orderId}`)
            if (response.status === 200) {
                handleUpdateLocalState({ id: orderId } as IOrder, "delete")
                toast.success("Order Deleted Successfully")
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Error Deleting Order")
            console.error("Delete order error:", error)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the order.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteOrder}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}