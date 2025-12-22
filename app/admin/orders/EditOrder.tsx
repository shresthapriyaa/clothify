"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import axios from "axios"
import { Edit } from "lucide-react"
import { IOrder, IProduct, IUser } from "./types/types"

const OrderItemSchema = z.object({
    productId: z.string(),
    quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
    size: z.string().min(1, { message: "Size is required" }),
    color: z.string().min(1, { message: "Color is required" })
})

const OrderSchema = z.object({
    userId: z.string(),
    items: z.array(OrderItemSchema)
})

interface IEditOrderProps {
    order: IOrder
    users: IUser[]
    products: IProduct[]
    handleUpdateLocalState: (order: IOrder, type: string) => void
}

export function EditOrder({ order, users, products, handleUpdateLocalState }: IEditOrderProps) {
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof OrderSchema>>({
        resolver: zodResolver(OrderSchema),
        defaultValues: {
            userId: order.userId,
            items: order.items?.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                size: item.size,
                color: item.color
            })) || []
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items"
    })

    const onSubmit = async (data: z.infer<typeof OrderSchema>) => {
        // Calculate total
        const total = data.items.reduce((acc, item) => {
            const product = products.find(p => p.id === item.productId)
            return acc + (product ? product.price * item.quantity : 0)
        }, 0)

        const payload = {
            ...data,
            total
        }

        try {
            const response = await axios.put(`/api/orders/${order.id}`, payload)
            if (response.status === 200) {
                toast.success("Order updated successfully")
                handleUpdateLocalState(response.data.data, "edit")
                setOpen(false)
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Error updating order")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon">
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Order</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select user" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map(u => (
                                                <SelectItem key={u.id} value={u.id}>
                                                    {u.username}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-4">
                            {fields.map((fieldItem, index) => (
                                <div key={fieldItem.id} className="p-4 border rounded space-y-2">
                                    <FormField
                                        control={form.control}
                                        name={`items.${index}.productId`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Product</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select product" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {products.map(p => (
                                                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`items.${index}.quantity`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Quantity</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={1}
                                                        {...field}
                                                        onChange={e => field.onChange(parseInt(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`items.${index}.size`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Size</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`items.${index}.color`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Color</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="button" variant="destructive" onClick={() => remove(index)}>
                                        Remove Item
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <Button type="button" onClick={() => append({ productId: "", quantity: 1, size: "", color: "" })}>
                            Add Item
                        </Button>

                        <Button type="submit" className="mt-4">
                            Save Order
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
