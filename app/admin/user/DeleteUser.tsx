

import { IUser } from "@/app/admin/types/types";
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
import axios from "axios";
import { Trash } from "lucide-react"
import { toast } from "sonner";
import { useState } from "react";

interface IDeleteUserProps {
    userId: string;
    handleUpdateLocalState: (user: IUser, type: string) => void
}

export function DeleteUser({ userId, handleUpdateLocalState }: IDeleteUserProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handlDeleteUser = async () => {
        try {
            setIsDeleting(true)
            
            const response = await axios.delete(`/api/users/${userId}`)
            
            if (response.status === 200) {
                handleUpdateLocalState({ id: userId } as IUser, "delete")
                toast.success("User deleted successfully")
                setIsOpen(false) 
            }
        } catch (error: any) {
            console.error('Delete error:', error)
            
            // Get the error message from the API response
            const errorMessage = error.response?.data?.error || 'Failed to delete user'
            
            // Handle different error scenarios
            if (error.response?.status === 404) {
                toast.error('User not found or already deleted')
                setIsOpen(false)
                handleUpdateLocalState({ id: userId } as IUser, "delete")
            } else if (error.response?.status === 400) {
                // This user has orders - show the full message from API
                toast.error(errorMessage, {
                    duration: 6000,
                    description: "Users with order history cannot be deleted for data integrity."
                })
            } else {
                // Other errors
                toast.error(errorMessage)
            }
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
                        user account and remove their data from our servers.
                        {' '}
                        <span className="font-semibold text-red-600">
                            Note: Users with existing orders cannot be deleted.
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={handlDeleteUser}
                        disabled={isDeleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}