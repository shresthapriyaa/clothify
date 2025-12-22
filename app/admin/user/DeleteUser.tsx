

// import { IUser } from "@/app/admin/types/types";
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
// import axios from "axios";
// import { Trash } from "lucide-react"
// import { toast } from "sonner";

// interface IDeleteUserProps {
//     userId: string;
//     handleUpdateLocalState: (user: IUser, type: string) => void
// }

// export function DeleteUser({ userId, handleUpdateLocalState }: IDeleteUserProps) {
//     const handlDeleteUser = async () => {
//         try {
//             const response = await axios.delete(`/api/users/${userId}`)
//             if (response.status === 200) {
//                 handleUpdateLocalState(response.data.data, "delete")
//                 toast("User Deleted Succesfully")
//             }
//         } catch (error) {
//             toast("Error Deleting user");
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
//                         This action cannot be undone. This will permanently delete your
//                         account and remove your data from our servers.
//                     </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                     <AlertDialogCancel>Cancel</AlertDialogCancel>
//                     <AlertDialogAction onClick={handlDeleteUser}>Delete</AlertDialogAction>
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>
//     )
// }




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
            
           
            
            const errorMessage = error.response?.data?.error || 'Failed to delete user'
            
           
            if (error.response?.status === 404) {
                toast.error('User not found or already deleted')
                setIsOpen(false)
               
                handleUpdateLocalState({ id: userId } as IUser, "delete")
            } else if (errorMessage.includes('order(s)')) {
                toast.error('Cannot delete user with existing orders', {
                    duration: 5000
                })
            } else {
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