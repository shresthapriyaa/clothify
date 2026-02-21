
import { useState } from "react";
import { IOrder } from "./types/types";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

interface IEditOrderProps {
    order: IOrder;
    handleUpdateLocalState: (order: IOrder, type: string) => void;
}

export function EditOrder({ order, handleUpdateLocalState }: IEditOrderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [status, setStatus] = useState(order.status || "PENDING");
    const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus || "PENDING");

    const handleUpdateOrder = async () => {
        try {
            setIsUpdating(true);

            const response = await axios.patch(`/api/orders/${order.id}`, {
                status,
                paymentStatus,
            });

            if (response.status === 200) {
                handleUpdateLocalState(response.data.data, "update");
                toast.success("Order updated successfully");
                setIsOpen(false);
            }
        } catch (error: any) {
            console.error("Update error:", error);
            toast.error(error.response?.data?.error || "Failed to update order");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogTrigger asChild>
                <Button size="icon" variant="outline" className="bg-white hover:bg-black/15">
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Order Status</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4 ">
                    
                    <div className="bg-gray-200 p-4 rounded-lg space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-black">Order ID:</span>
                            <span className="font-mono">#{order.id.slice(0, 8)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-black">Total:</span>
                            <span className="font-semibold">${order.total?.toFixed(2) || '0.00'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-black">Customer:</span>
                            <span>{order.user?.email || 'Guest'}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Order Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger id="status">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="PROCESSING">Processing</SelectItem>
                                <SelectItem value="SHIPPED">Shipped</SelectItem>
                                <SelectItem value="DELIVERED">Delivered</SelectItem>
                                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="paymentStatus">Payment Status</Label>
                        <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                            <SelectTrigger id="paymentStatus">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="PAID">Paid</SelectItem>
                                <SelectItem value="FAILED">Failed</SelectItem>
                                <SelectItem value="REFUNDED">Refunded</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isUpdating}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateOrder} disabled={isUpdating}>
                        {isUpdating ? "Updating..." : "Update"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}